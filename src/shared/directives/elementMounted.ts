import { computed, DirectiveBinding, watchEffect } from "vue"

export const vElementMounted = {
    mounted: (element:HTMLTextAreaElement, binding:any) => {
        console.log("best use of tech")
        // let smth = computed<string>((): string => {
            
        //     console.log(element.value)

        //     const padding = 2
        //     const height = Math.round((element.scrollHeight - padding) / 20)
        //     return (height * 20) + 'px'
        // })

        // element.style.height = smth.value

        watchEffect(() => {
            console.log(element.value + "")

            const padding = 2
            const height = Math.round((element.scrollHeight - padding) / 20)
            element.style.height = (height * 20) + 'px'
        })
    }
}