<template>
    <div>
        <b-form-textarea
          id="textarea"
          placeholder="Skriv ditt svar her"
          rows="0"
          max-rows="6"
        ></b-form-textarea>
    </div>
</template>

<script>
export default {
    name: 'NewMessage',
    props: ['name'],
    data(){
        return {
            newMessage: null
        }
    },
    methods: {
        addMessage(){
            if (this.newMessage){
                //
            } else {
                //
            }
        }
    }
}
</script>

<style scoped>

</style>