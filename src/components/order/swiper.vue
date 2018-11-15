<template>

    <div class="swiper-container">
        <div class="swiper-wrapper">
            <div class="swiper-slide">
                <img src="../../assets/images/banner.png" alt="">
            </div>
            <div class="swiper-slide">
                <img src="../../assets/images/banner.png" alt="">
            </div>
            <div class="swiper-slide">
                <img src="../../assets/images/banner.png" alt="">
            </div>

        </div>
        <div class="swiper-pagination" ></div>

    </div>






</template>

<script>
    // 默认导出一个对象
    import Swiper from "swiper";
     import "../../../node_modules/swiper/dist/css/swiper.min.css"

    export default {


            mounted(){
                var mySwiper = new Swiper('.swiper-container', {
                    autoplay:{
                        delay: 3000,
                        stopOnLastSlide: false,
                        disableOnInteraction: true
                    },
                    loop:true,
                    pagination: {
                        el: '.swiper-pagination',
                    },
                })


            }

    }

</script>

<style lang="scss" scoped>
    .swiper-container{
        margin-top:62px;

    img{

        width:100%;
    }

    }

</style>

