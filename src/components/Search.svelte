<script lang="ts">
    import Select from "svelte-select";
    import { query } from "svelte-apollo";
    import { gql } from "apollo-boost";
    import { setCountries, countries, setCurrency } from "../store/store";

    const GET_COUNTRIES = gql`
        query getCountries {
            germany: country(code: "DE") {
                code
                name
                currency
                emoji
            }
            sweden: country(code: "SE") {
                code
                name
                currency
                emoji
            }
            ukraine: country(code: "UA") {
                code
                name
                currency
                emoji
            }
            korea: country(code: "KR") {
                code
                name
                currency
                emoji
            }
            zealand: country(code: "NZ") {
                code
                name
                currency
                emoji
            }
        }
    `;
    async function getCountries() {
        const promise = await query(GET_COUNTRIES).result();
        setCountries(promise.data);
    }

    getCountries();

    function handleSelect(event) {
        setCurrency(event.detail)
    }
</script>

<div>
    <p>Select your country</p>
    <div class="w-96">
        <Select
            items={$countries.map((item) => ({
                value: item.currency,
                label: `${item.emoji} ${item.name}`,
            }))}
            on:select={handleSelect}
            placeholder="Search"
            showChevron={true}
        />
    </div>
</div>