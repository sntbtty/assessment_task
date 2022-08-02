<script>
    import Info from "../components/Info.svelte";
    import ApolloClient from "apollo-boost";
    import { setClient } from "svelte-apollo";

    const client = new ApolloClient({
        uri: "https://swop.cx/graphql?api-key=ab26844d97a7ad0451a9a2f12704c22a0f888007ec23c9041a2c3d617f669f26",
    });
    setClient(client);
</script>

<div>
    <Info />
</div>
