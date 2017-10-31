<template lang="pug">
	transition(v-on:enter="startAnimate" v-on:before-enter="beforeAnimate" v-on:leave="leaveAnimate" appear mode="out-in")
		section.works-block
				.work-background.offScreen(v-bind:style="{ backgroundImage: img}")
				.work.owl-carousel
					.item(v-for="work in works")
						.color-half.offScreen(href="#" v-bind:style="{ backgroundColor: work.color }")
							a(v-bind:href="work.site_url", target="_blank" v-if="work.site_url").top-links
								h2 {{work.name}}
								.site-link
									i.fa.fa-link(aria-hidden="true")
							.top-links(v-else)
								h2 {{work.name}}
							ul.awards
								li(v-for="award in work.awards")
									a(v-bind:href="award.link") {{ award.text }}
							a(v-bind:href="work.bh_url", target="_blank" v-if="work.bh_url").bottom-links
								span Подробнее
								img(src="src/assets/svg/plus.svg")

						.info-half.offScreen
							ul
								li(v-for="feature in work.features") {{ feature.text }}
							.year {{ work.year }}
				.owl-controls
					.owl-navs
						.owl-nav(@click="prevSlide" v-bind:class="{disabled: prevDisabled}") предыдущая<br>
						.owl-nav(@click="nextSlide" v-bind:class="{disabled: nextDisabled}") следующая работа
					.owl-dots



</template>

<script>
	export default{
		name: 'works-block',
		data(){
			return{
				works:[
					{
						name: 'Частная лавочка',
						year: 2017,
						color: '#d56b4f',
						img: 'url(src/assets/w8.jpg)',
						features: [{ text: 'проектирование'}, {text: 'дизайн'}, {text: 'motion дизайн'}, {text: 'фото'}, {text: 'поддержка'}, {text: 'frontend'}, {text: 'backend'}],
						bh_url: 'https://www.behance.net/gallery/56018341/Private-shop-web',
						site_url: 'http://lavochkamarket.ru'
					},
					{
						name: 'TEXX',
						year: 2017,
						color: '#2f2f2f',
						img: 'url(src/assets/w7.jpg)',
						features: [{ text: 'проектирование'}, {text: 'дизайн'}, {text: 'motion дизайн'}, {text: 'графический контент'}, {text: 'frontend'}, {text: 'backend'}],
						bh_url: 'https://www.behance.net/gallery/55437297/Texx-web',
						awards: [
							{
								text: 'Best of Behance gallery',
								link: 'https://www.behance.net/gallery/55437297/Texx-web'
							}
						]
					},
					{
						name: 'FURNITA',
						year: 2017,
						color: '#333131',
						img: 'url(src/assets/w6.jpg)',
						features: [{ text: 'проектирование'}, {text: 'дизайн'}, {text: 'motion дизайн'}],
						bh_url: 'https://www.behance.net/gallery/54218875/furnita-web',
						awards: [
							{
								text: 'Best of Behance gallery',
								link: 'https://www.behance.net/gallery/54218875/furnita-web'
							}
						]
					},
					{
						name: 'BALANCE',
						year: 2017,
						color: '#09192D',
						img: 'url(src/assets/w2.jpg)',
						features: [{ text: 'проектирование'}, {text: 'дизайн'}, {text: 'motion дизайн'}, {text: 'frontend'}, {text: 'backend'}, {text: 'поддержка'}],
						bh_url: 'https://www.behance.net/gallery/50503185/Balance-web',
						site_url: 'http://fitnessbalance.ru/',
						awards: [
							{	
								text: 'CSSDA — Special Design Kudos Awarded, 2017',
								link: 'http://www.cssdesignawards.com/sites/balance/30784'
							}
						]
					},
					{
						name: 'АВАКС',
						year: 2017,
						color: '#3ab9db',
						img: 'url(src/assets/w3.jpg)',
						features: [{text: 'проектирование'}, {text: 'дизайн'}, {text: 'motion дизайн'}, {text: 'видео'}, {text: '3D-визуаилизация'}, {text: 'frontend'}, {text: 'backend'}], 
						bh_url: 'https://www.behance.net/gallery/54385533/Avaks-logo-web-cgi',
						site_url: 'http://uav-siberia.com',
						awards: [
							{	
								text: 'Рейтинг Рунета — 3-е место в номинации «Промышленность и оборудование», 2017',
								link: 'http://awards.ratingruneta.ru/winners/'
							}
						]
					},
					{
						name: 'MDIS',
						year: 2017,
						color: '#ff4a4a',
						img: 'url(src/assets/w1.jpg)',
						features: [{text: 'проектирование'}, {text: 'дизайн'}, {text: 'motion дизайн'}, {text: 'frontend'}, {text: 'backend'}],
						site_url: 'http://mdis.ru',
						bh_url: 'https://www.behance.net/gallery/56861115/MDIS-web',
					}
					/*{
						name: 'BINAR',
						year: 2017,
						color: '#71441b',
						img: 'url(src/assets/w4.jpg)',
						features: [{text: 'брендинг'}, {text: 'проектирование'}, {text: 'дизайн'}, { text: 'motion дизайн'}, {text: 'графический контент'}, {text: 'frontend'}, {text: 'backend'}],
						bh_url: 'https://www.behance.net/gallery/51493201/Binar-branding-web'
					},
					{
						name: 'СГК',
						year: 2015,
						color: '#7b8898',
						img: 'url(src/assets/w5.jpg)',
						features: [{text: 'проектирование'}, {text: 'дизайн'}, {text: '3D-визуализация'}, {text: 'frontend'}, {text: 'backend'}],
						bh_url: 'https://www.behance.net/gallery/43335773/Siberian-Generating-Company-web',
						site_url: 'http://sibgenco.ru/'
					}*/
				],
				owl: '',
				prevDisabled: true,
				nextDisabled: false,
				img: 'url(src/assets/w8.jpg)'
			}
		},
		methods:{
			owlInit(el){
				this.owl = $('.work').owlCarousel({
    				nav:true,
    				items:1,
    				dotsContainer: '.owl-dots'
              	});
			},
			prevSlide(){
			    this.owl.trigger('prev.owl.carousel');
			},
			nextSlide(){
			    this.owl.trigger('next.owl.carousel');
			},
			startAnimate(el, done){
				setTimeout(() => {
					$(this.$el).find('.color-half').toggleClass('onScreen offScreen');
					$(this.$el).find('.info-half').toggleClass('onScreen offScreen');
					$(this.$el).find('.work-background').toggleClass('onScreen offScreen');
					done();
				}, 700);
			},
			beforeAnimate(){
				$(this.$el).find('.color-half').removeClass('onScreen');
				$(this.$el).find('.info-half').removeClass('onScreen');
				$(this.$el).find('.work-background').removeClass('onScreen');
			},
			leaveAnimate(el, done){
				$(this.$el).find('.color-half').toggleClass('onScreen offScreen');
				$(this.$el).find('.info-half').toggleClass('onScreen offScreen');
				setTimeout(() => {$(this.$el).find('.work-background').toggleClass('onScreen offScreen');
				}, 350);

				setTimeout(() => {
					done();
				}, 800);
			},
			loadImages(){
				let bgImg = [];
				for (let i = 0; i < this.works.length; i++){
					let last = this.works[i].img.length - 1;
					var src = this.works[i].img.slice(4, last);
					bgImg[i] = new Image();
					bgImg[i].src = src;
				}
			}
		},
		created(){
			this.loadImages();
		},
		mounted(){
			let self = this;
			setTimeout(() => {
				this.owlInit();
				this.owl.on('changed.owl.carousel', function(event) {
				    let id = $('.owl-dot.active').index();
				    if (id == 0) {
				    	self.prevDisabled = true;
				    } else {
				    	self.prevDisabled = false;
				    }
				    if (id == self.works.length-1){
				    	self.nextDisabled = true;
				    } else {
				    	self.nextDisabled = false;
				    }
				    self.img = self.works[id].img;
				})
			}, 600)

			
		}
	}
</script>

<style lang="scss">
	.work-background{
		position: absolute;
		z-index: 0;
		height: 100%;
		width: 100%;
		background-position: center;
		background-size: cover;
		opacity: 0;
		transition: all .35s cubic-bezier(0.215, 0.61, 0.355, 1);
		&.onScreen{
			opacity: 1;
		}
		&.offScreen{
			opacity: 0;
		}
	}
	.works-block{
		position: absolute;
		z-index: 0;
		top: 0px;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
	}
	.work{
		width: 100vw;
		height: 100vh;
		position: relative;
		overflow: hidden;
	}
	.owl-carousel{
		display: block;
	}
	.item{
		position: relative;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		width: 82%;
		height: 76%;
		display: flex;
		.color-half{
			width: 50%;
			height: 0%;
			opacity: 0;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			padding: 5% 8%;
			position: absolute;
			left: 0%;
			transition: all .35s cubic-bezier(0.215, 0.61, 0.355, 1);
			text-decoration: none;
			&:before{
				content: none;
			}
			&:hover{
				opacity: 1!important;
			}
			&.onScreen{
				height: 100%;
				opacity: 0.85;
				top: 0px;
				bottom: auto;
			}
			&.offScreen{
				height: 0%;
				opacity: 0;
				top: auto;
				bottom: 0px;
			}
			h2{
				color: #fff;
				margin-top: 0px;
				margin-bottom:	0px;
				font-weight: 400;
				font-size: 48px;
			}
			.top-links{
				display: flex;
				justify-content: space-between;
				align-items: center;
				text-decoration: none;
				&:hover{
					.site-link{
						transform: scale(1.15);
					}
				}
				.site-link{
					color: #fff;
					font-size: 22px;
					transition: all .35s cubic-bezier(0.215, 0.61, 0.355, 1);
				}
			}
			.bottom-links{
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				text-decoration: none;
				&:hover{
					img{
						transform: scale(1.15) rotate(90deg);
					}
				}
				span{
					color: #fff;
					text-decoration: none;
					text-transform: uppercase;
					font-size: 17px;
					line-height: 155%;
					font-weight: 400;
				}
				img{
					transition: all .35s cubic-bezier(0.215, 0.61, 0.355, 1);
				}
			}
		}
		.info-half{
			width: 50%;
			height: 0%;
			opacity: 0;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			padding: 5% 8%;
			position: absolute;
			left: 50%;
			background-color: rgba(#000, 0.5);
			transition: all .35s cubic-bezier(0.215, 0.61, 0.355, 1);
			&.onScreen{
				height: 100%;
				opacity: 1;
				top: 0px;
				bottom: auto;
			}
			&.offScreen{
				height: 0%;
				opacity: 0;
				top: auto;
				bottom: 0px;
			}
			ul{
				margin-top: 0px;
				list-style: none;
				margin-left: 0;
				padding-left: 0;
				li{
					color: #fff;
					margin-bottom: 10px;
					padding-left: 1em;
  					text-indent: -1em;
  					font-size: 16px;
  					&:before{
  						content: "-";
  						padding-right: 7px;
  					}
				}
			}
			.year{
				transform: rotate(-90deg);
				color: rgba(#fff, 0.6);
			    position: absolute;
    			right: 8%;
    			top: 10%;
    			font-size: 16px;
    			font-weight: 400;
			}
		}
	}
	.owl-item{
		cursor: url(/src/assets/svg/cursor_left_right.svg) 22 8 , move;
		&:active, &:focus{
			cursor: url(/src/assets/svg/cursor_left_right2.svg) 22 8, move;
		}
	}
	.owl-carousel .owl-stage{
		height: 100vh;
	}
	.owl-carousel .owl-item{
		height: 100%;
	}
	.owl-carousel .owl-item img{
		width: auto;
	}
	.owl-controls{
        position: absolute;
	    bottom: 20%;
        width: 50%;
	    right: 3%;
	    padding: 0px 10%;
	    display: flex;
	    justify-content: space-between;
	    align-items: flex-end;
	    z-index: 1;
	    .owl-navs{
    		.owl-nav{
    			color: #fff;
    			text-decoration: none;
    			display: block;
    			margin-bottom: 10px;
    			cursor: pointer;
    			&.disabled{
    				color: rgba(#fff, 0.5);
    				cursor: default;
    			}
    			&:last-child{
    				margin-bottom: 0px;
    			}
    		}
    	}
	    .owl-dots{
	    	.owl-dot {
			    width: 10px;
			    height: 10px;
			    display: inline-block;
			    border: 2px solid #fff;
			    border-radius: 50%;
			    margin-right: 20px;
			    background-color: transparent;
			    transition: all .35s cubic-bezier(0.215, 0.61, 0.355, 1);
			    cursor: pointer;
			    &.active, &:hover{
			    	background-color: #fff;
			    }
			    &:last-child{
			    	margin-right: 0px;
			    }
			}
	    }
	}

	.awards{
		list-style: none;
		padding: 0px;
		width: 45%;
		height: 75%;
		opacity: 0.65;
		li{
			margin-bottom: 10px;
			a{
				color: #fff;
				text-decoration: none;
				line-height: 150%;
				font-size: 16px;
				&:before{
					top: 8px;
					transform: translateX(0%);
				}
			}
		}
	}
	
	@media (max-width: 1025px){
		.owl-controls .owl-dots .owl-dot{
			margin-right: 10px;
		}
		.owl-carousel .owl-stage, .owl-carousel .owl-stage-outer, .work{
			height: 100%;
		}
		.awards{
			width: 65%;
		}
	}

	@media (max-width: 769px){
		.awards{
			width: 45%;
		}
		.item .color-half{
			width: 100%;
			&.onScreen{
				height: 50%;
			}
		}

		.item .info-half{
			width: 100%;
			top: 50%;
			left: 0%;
			&.onScreen{
				height: 50%;
				top: 50%;
			}
		}
		.item{
			flex-direction: row;
			flex-wrap: wrap;
		}
		.owl-controls{
			bottom: 16%;
		    width: 90%;
		    right: 5%;
		}
		.item .info-half .year{
			right: 6%;
		}
	}

	@media (max-width: 469px){
		.awards {
		    width: 80%;
		}
		.awards li a{
			font-size: 14px;
			line-height: 120%;
		}
		.item .info-half ul li{
			font-size: 14px;
			margin-bottom: 5px;
		}
		.item .info-half .year{
			top: 6%;
			right: 4%;
		}
		.owl-controls .owl-navs .owl-nav{
			font-size: 14px;
			display: none;
		}
		.item .color-half h2{
			font-size: 32px;
		}
		.item .color-half, .item .info-half{
			padding: 8%;
		}
		.works-block{
			height: 100%;
		}
		.owl-carousel .owl-stage{
			height: 100%;
		}
		.work, .works-block{
			height: 100%;
		}
		.owl-carousel .owl-stage-outer{
			height: 100%;
		}
		.item .info-half .year{
			top: 14%;
		}
		.item{
			height: 76%;
		}
		.item .info-half .year{
			font-size: 22px;
		}
		.owl-controls .owl-dots .owl-dot{
			width: 14px;
			height: 14px;
		}
	}
</style>