<template>
    <div class="about">
        <h3>Hello {{ their_name }}, this is an about page</h3>
        <p>Version 1.0.0</p>
    </div>
</template>

<script>
export default {
    name: 'About',
    data() {
        return {
            their_name: this.$route.params.name
        }
    }
}
</script>