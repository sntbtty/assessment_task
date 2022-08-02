<script lang="ts">
    import { rate } from "../store/store";
    import stonks from "../assets/stonks.png";
    import loader from "../assets/loader.gif";

    type Data = {
        price: string,
        volume: string,
        percentage: string
    }

    export let crypto: string;
    export let data: Data;
    export let currency: string;

    let percentage: string;
    let isNegative: boolean;

    $: if(data?.percentage) {
        percentage = data?.percentage
        isNegative = percentage?.includes('-')
    }

</script>

{#if data}
    <div class="text-blue">
        <div class="shadow-xl  w-48">
            <div class="p-2">
                <div class="flex flex-row text-base justify-between">
                    <p>{crypto}/USDT</p>
                    <p class={`${isNegative ? 'text-red-700' : 'text-lime-500'} text-xs`}>{percentage}%</p>
                </div>
                <p class="text-xl">{data?.price}</p>
                <p class="text-xs">Volume: {data?.volume}</p>
            </div>
            <img src={stonks} alt="stonks" />
        </div>
        <p class="text-xs m-1.5">
            {currency || "USD"}: {($rate * parseFloat(data?.price)).toFixed(5)}
        </p>
    </div>
{/if}
{#if !data}
    <img src={loader} alt="loader" class="w-32 h-32"/>
{/if}
