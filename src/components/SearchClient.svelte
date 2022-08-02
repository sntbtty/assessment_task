<script>
    import Search from "../components/Search.svelte";
    import ApolloClient from "apollo-boost";
    import { setClient } from "svelte-apollo";

    const client = new ApolloClient({
        uri: "https://countries.trevorblades.com/query",
    });
    setClient(client);
</script>

<div>
    <Search />
</div>
