<script lang="ts">
    import InfoCard from "./InfoCard.svelte";
    import { onMount } from "svelte";
    import { gql, type ApolloQueryResult } from "apollo-boost";
    import { query } from "svelte-apollo";
    import { currency, setRate } from "../store/store";

    const API_KEY = "Y2MGZDB70FQ7IIN5YPV3";
    const socket = new WebSocket(
        `wss://stream.cryptowat.ch/connect?apikey=${API_KEY}`
    );

    type Interval = {
        closetime: string;
        ohlc: {
            openStr: string;
            highStr: string;
            lowStr: string;
            closeStr: string;
        };
        opentime: string;
        periodName: string;
        volumeBaseStr: string;
        volumeQuoteStr: string;
    };

    type Data = {
        price: string;
        volume: string;
        percentage: string;
    };

    type MarketData = {
        marketUpdate: {
            intervalsUpdate: { intervals: Interval[] };
            market: {
                currencyPairId: string;
                exchangeId: string;
                marketId: string;
            };
        };
    };

    export let btcData: Data;
    export let ethData: Data;
    export let adaData: Data;

    function getCurrencyData(interval: Interval) {
        return {
            price: interval.ohlc.closeStr,
            volume: interval.volumeBaseStr,
            percentage: (
                (1 -
                    parseFloat(interval.ohlc.openStr) /
                        parseFloat(interval.ohlc.closeStr)) *
                100
            ).toFixed(2),
        };
    }

    function filterPair(data: MarketData) {
        if (data.marketUpdate !== undefined) {
            const interval = data.marketUpdate.intervalsUpdate.intervals.filter(
                (interval: { periodName: string }) =>
                    interval.periodName === "86400"
            )[0];
            if (!interval) return "hehehe";
            switch (data?.marketUpdate.market?.currencyPairId) {
                case "9":
                    btcData = getCurrencyData(interval);
                    break;
                case "125":
                    ethData = getCurrencyData(interval);
                    break;
                case "1488":
                    adaData = getCurrencyData(interval);
                    break;
                default:
                    console.log("hello)))))))");
            }
        }
    }

    onMount(() => {
        socket.addEventListener("message", (event) => {
            const reader = new FileReader();

            if (event.data instanceof Blob) {
                reader.onload = () => {
                    filterPair(JSON.parse(reader.result.toString()));
                    if (reader.result.toString().includes("AUTHENTICATED")) {
                        subscribe(socket, [
                            "markets:61122:ohlc",
                            "markets:61123:ohlc",
                            "markets:61175:ohlc",
                        ]);

                        // setTimeout(function () {
                        //     unsubscribe(socket, [
                        //         "markets:61122:ohlc",
                        //         "markets:61122:ohlc",
                        //         "markets:61175:ohlc",
                        //     ]);
                        // }, 10000);
                    }
                };

                reader.readAsText(event.data);
            } else {
                console.log("Result without data: " + event.data);
            }
        });

        function subscribe(socket: WebSocket, resources: string[]) {
            socket.send(
                JSON.stringify({
                    subscribe: {
                        subscriptions: resources.map((resource) => {
                            return {
                                streamSubscription: { resource: resource },
                            };
                        }),
                    },
                })
            );
        }

        // function unsubscribe(socket: WebSocket, resources: string[]) {
        //     socket.send(
        //         JSON.stringify({
        //             unsubscribe: {
        //                 subscriptions: resources.map((resource) => {
        //                     return {
        //                         streamSubscription: { resource: resource },
        //                     };
        //                 }),
        //             },
        //         })
        //     );
        //     socket.close();
        // }
    });

    const GET_MONEY = (currency: string) => gql`
        query getMoney {
            convert(
                amount: 1
                baseCurrency: "USD"
                quoteCurrencies: ["${currency}"]
            ) {
                quoteAmount
            }
        }
    `;

    async function getMoneyAmount() {
        const response: any = await query(
            GET_MONEY($currency || "USD")
        ).result();
        setRate(response.data.convert[0].quoteAmount);
    }

    $: $currency && getMoneyAmount();
</script>

<div class="flex space-x-4 pt-6">
    <InfoCard crypto={"BTC"} data={btcData} currency={$currency} />
    <InfoCard crypto={"ETH"} data={ethData} currency={$currency} />
    <InfoCard crypto={"ADA"} data={adaData} currency={$currency} />
</div>
