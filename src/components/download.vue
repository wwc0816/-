<template>
    <div class="home wrapDiv">
        <div class="downloadDiv mapbg">
            <p class="slogon slogonb">无障碍登录，就用CoinsUp App</p>
            <p class="slogon slogons">覆盖IOS、Android平台，支持全业务功能</p>
            <p class="slogon slogoni"><a  href="http://m.coinsup.top/"  target="view_window">

                <img src="../assets/images/手机端下载.png" alt=""></a></p>
            <div class="appshow">
                <img src="../assets/images/appshow1.png" alt="">
                <img src="../assets/images/appshow2.png" alt="">
                <img src="../assets/images/appshow3.png" alt="">
            </div>
            <div class="downlinks">
                <!-- <section>
                    <span>CoinsUp桌面客户端</span>
                    <p>
                        <a href=""><img src="../assets/images/winlink.png" alt=""></a>
                        <a href=""><img src="../assets/images/maclink.png" alt=""></a>
                    </p>
                </section> -->
                <section>
                    <span>CoinsUp 法币交易APP</span>
                    <div class="divp">
                        <div class="flip-container" ontouchstart="this.classList.toggle('hover');">
                            <div class="flipper">
                                <div class="front">
                                    <img src="../assets/images/androidlink.png" alt="">
                                </div>
                                <div class="back">
                                    <img src="../assets/images/andotc.png" alt="">
                                </div>
                            </div>
                        </div>
                        <div class="flip-container" ontouchstart="this.classList.toggle('hover');">
                            <div class="flipper">
                                <div class="front">
                                    <img src="../assets/images/iphone.png" alt="">
                                </div>
                                <div class="back">
                                    <img src="../assets/images/22.png" alt=""><!--cto 对应的是法币-->
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section>
                    <span>CoinsUp 币币交易APP</span>
                    <div class="divp">
                        <div class="flip-container" ontouchstart="this.classList.toggle('hover');">
                            <div class="flipper">
                                <div class="front">
                                    <img src="../assets/images/androidlink.png" alt="">
                                </div>
                                <div class="back">
                                    <img src="../assets/images/andbb.png" alt="">
                                </div>
                            </div>
                        </div>
                        <div class="flip-container" ontouchstart="this.classList.toggle('hover');">
                            <div class="flipper">
                                <div class="front">
                                    <img src="../assets/images/iphone.png" alt="">
                                </div>
                                <div class="back">
                                    <img src="../assets/images/11.png" alt=""><!--up  币币交易-->
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.downloadDiv{
    .slogon{
        color: #ffffff;
        text-align: center;
    }
    .slogonb{
        font-size: 36px;
        padding-top: 191px;
        padding-bottom: 32px;
    }
    .slogons{
        font-size: 24px;
        padding-bottom: 83px;
    }
    .slogoni{
        font-size: 24px;
        padding-bottom: 50px;

    }
    .appshow{
        display: flex;
        justify-content: center;
        padding-bottom: 30px;
    }
    .downlinks{
        display: flex;
        justify-content: space-around;
        padding: 0 100px;
        padding-bottom: 86px;
        
        section{
            display: flex;
            flex-direction: column;
            align-items: center;
            span{
                font-size: 18px;
                padding-bottom: 38px;
            }
            p,.divp{
                display: flex;
                width: 285px;
                justify-content: space-between;
            }
        }
    }
}
/* entire container, keeps perspective */
.flip-container {
	perspective: 1000;
}
	/* flip the pane when hovered */
	.flip-container:hover .flipper, .flip-container.hover .flipper {
		transform: rotateY(180deg);
	}

.flip-container, .front, .back {
	width: 131px;
	height: 131px;
}

/* flip speed goes here */
.flipper {
	transition: 0.6s;
	transform-style: preserve-3d;

	position: relative;
}

/* hide back of pane during swap */
.front, .back {
	backface-visibility: hidden;
	position: absolute;
	top: 0;
    left: 0;
}

/* front pane, placed above back */
.front {
	z-index: 2;
}

/* back, initially hidden pane */
.back {
	transform: rotateY(180deg);
}
</style>

<style>

</style>
