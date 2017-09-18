<template lang="pug">
	transition(v-on:enter="startAnimate" v-on:before-enter="beforeAnimate" v-on:leave="leaveAnimate" appear mode="out-in")
		.fullpage(v-if="member_data && Object.keys(member_data).length")
			.background-pic.offScreen(:style="{backgroundImage: member_data.img}")
				.overlay
			section
				.small-view.team.animated.offScreen
					.member-info
						.half
							.personal
								.name {{member_data.name}}
								.rank {{member_data.rank}}
							.quote {{member_data.descr}}
							.member-awards
								.award(v-for="award in member_data.awards")
									img(:src="award.img")
									span {{award.award_text}}
						.half
							ul.skills
								li(v-for="skill in member_data.skills") {{skill}}
							a.email(href="") {{member_data.email}}


</template>

<script>

	import axios from 'axios'

	export default{
		data(){
			return{
				member_data: ''
			}
		},
		methods:{
			startAnimate(el, done){
				setTimeout(() => {
					$(this.$el).find('.small-view').toggleClass('onScreen offScreen');
					$(this.$el).find('h1').toggleClass('onScreen offScreen');
					$(this.$el).find('p').toggleClass('onScreen offScreen');
					$(this.$el).find('.background-pic').toggleClass('onScreen offScreen');

					done();
				}, 700);
			},
			beforeAnimate(){
				$(this.$el).find('.small-view').removeClass('onScreen');
				$(this.$el).find('h1').removeClass('onScreen');
				$(this.$el).find('p').removeClass('onScreen');
				$(this.$el).find('.background-pic').removeClass('onScreen');

			},
			leaveAnimate(el, done){
				setTimeout(() => {$(this.$el).find('.small-view').toggleClass('onScreen offScreen');}, 350)
				$(this.$el).find('h1').toggleClass('onScreen offScreen');
				$(this.$el).find('p').toggleClass('onScreen offScreen');
				$(this.$el).find('.background-pic').toggleClass('onScreen offScreen');

				setTimeout(() => {
					done();
				},700);
			},
		},
		created(){
			const path = this.$route.path;
            const data_src = 'src/data' + path + '/data.json';
            
            axios.get(data_src).
            	then(response => {
                	this.member_data = response.data;
            	}).catch(error => {
                	console.log(error);
            	});
		}

	}
</script>

<style lang="scss" scoped>
	
	.fullpage{
		position: relative;
		width: 100%;
		height: 100%;
		background-color: #000;
	}
	section{
		position: relative;
		z-index: 1;
		height: 100%;
		width: 100%;
		background-color: transparent;
	}
	.background-pic{
		position: absolute;
		width: 100%;
		height: 100%;
		opacity: 1;
		transition: all .99s;
		background-position: center 0;
		background-size: cover;
		.overlay{
			width: 100%;
			height: 100%;
			top: 0px;
			left: 0px;
			background-color: rgba(0,0,0,.55);
			display: none;
		}
		&.offScreen{
			transform: scale(1);
		}
		&.onScreen{
			transform: scale(1.11);
		}
	}
	.ui-paginator{
		display: none!important;
	}
	.small-view{
		background-color: transparent;
	}
	.member-info{
		width: 84%;
		height: 84%;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		display: flex;
		flex-flow: row wrap;
		justify-content: space-between;
		.half{
			width: 25%;
			height: 100%;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			color: #fff;
			&:last-child{
				width: 20%;
			}
			.personal{
				.name{
					font-size: 2.6vw;
					font-weight: 200;
					margin-bottom: 40px;
				}
				.rank{
					font-size: 18px;
				}
			}
			.quote{
				width: 80%;
				line-height: 150%;
			}
			.award{
				margin-bottom: 20px;
				&:last-child{
					margin-bottom: 0px;
				}
				img{
					display: inline-block;
					width: 15%;
					margin-right: 5%;
					vertical-align: middle;
				}
				span{
					font-size: 14px;
					color: #fff;
					opacity: 0.45;
					width: 75%;
					display: inline-block;
					vertical-align: middle;
				}
			}
			.skills{
				padding: 0px;
				list-style: none;
				li{
					margin-bottom: 12px;
				}
			}
			.email{
				font-size: 18px;
				color: #fff;
				opacity: 0.45;
				position: static;
				transform: translateX(0px);
			}
		}
	}
	
	.member-info .half .skills{
		margin: 0px;
	}

	@media (max-width: 1367px){
		.member-info .half .quote, .member-info .half .skills{
			font-size: 16px;
		}
	}

	@media (max-width: 1025px){
		.member-info{
			width: 95%;
		}
		.member-info .half .email{
			opacity: 1;
		}
		.member-info .half .award span{
			opacity: 0.75;
		}
		.member-info .half .personal .name{
			margin-bottom: 25px;
		}
		.background-pic{
		    background-position: 40% 0;
		}
		.background-pic.onScreen{
			transform: scale(1.05);
		}
		.member-info .half .award span{
			width: 66%;
		}
		.background-pic .overlay{
			background-color: rgba(0,0,0,.25);	
			display: block;
		}
	}

	@media (max-width: 768px){
		.member-awards{
			display: none;
		}
		.member-info{
			flex-flow: column;
		}
		.member-info .half{
			width: 50%;
			height: 40%;
			margin-bottom: 20%;
		}
		.member-info .half:last-child{
			margin-bottom: 0px;
			width: 50%;
		}
		.member-info{
			height: 100%;
		}
		.member-info .half .personal .name{
			font-size: 5.6vw;
		}
		.member-info .half .quote, .member-info .half .skills{
			font-size: 20px;
		}
		.member-info .half .email{
			font-size: 20px;
		}
		.background-pic .overlay{
			background-color: rgba(0,0,0,.35);	
		}
	}

	@media (max-width: 700px){
		.background-pic.onScreen{
			transform: scale(1);
		}
		.background-pic{
			background-position: 30% 0;
		}
		.member-info .half .personal .name{
			font-size: 8vw;
			margin-bottom: 10px;
		}
		.member-info .half .personal .rank{
			font-size: 15px;
		}
		.member-info .half{
			width: 75%;
			height: 50%;
			margin-bottom: 0px;
		}
		.member-info .half:last-child{
			margin-bottom: 0px;
			width: 50%;
			height: 40%;
		}
		.member-info .half .quote{
			font-size: 18px;
			line-height: 125%;
		}
		.member-info .half .skills li{
			font-size: 14px;
			margin-bottom: 5px;
		}
	}

</style>