<template lang="pug">
	transition(v-on:enter="startAnimate" v-on:before-enter="beforeAnimate" v-on:leave="leaveAnimate" appear mode="out-in")
		.fullpage
			.background-pic
			section
				.small-view.team.animated.offScreen
					.team-header.offScreen
						h2 Команда
						ul.worker-switch
							li(v-bind:class='{ active: main_roster }' @click="switchRoster")
								button Офис в Москве
							li(v-bind:class='{ active: !main_roster }' @click="switchRoster")
								button Офис в Красноярске
					.team-content.offScreen(v-if="team_data && Object.keys(team_data).length")
						transition(name='fade')
							.team-container(v-show="main_roster" mode="out-in")
								router-link.team-item(v-for="main_member in team_data.main" :key="main_member.link" :data-img="main_member.img" :to="main_member.link")
									.name {{ main_member.name }}
									.rank {{ main_member.rank }}
						transition(name='fade')
							.team-container(v-show="!main_roster" mode="out-in")
								router-link.team-item(v-for="remote_member in team_data.remote" :key="remote_member.link" :to="remote_member.link")
									.name {{ remote_member.name }}
									.rank {{ remote_member.rank }}
</template>

<script>

	import axios from 'axios'

	export default{
		data(){
			return{
				main_roster: true,
				team_data: ''
			}
		},
		methods:{
			startAnimate(el, done){
				setTimeout(() => {
					$(this.$el).find('.small-view').toggleClass('onScreen offScreen');
					$(this.$el).find('.team-header').toggleClass('onScreen offScreen');
					$(this.$el).find('.team-content').toggleClass('onScreen offScreen');
					done();
				}, 700);
			},
			beforeAnimate(){
				$(this.$el).find('.small-view').removeClass('onScreen');
				$(this.$el).find('.team-header').removeClass('onScreen');
				$(this.$el).find('.team-content').removeClass('onScreen');
			},
			leaveAnimate(el, done){
				setTimeout(() => {$(this.$el).find('.small-view').toggleClass('onScreen offScreen');}, 350)
				$(this.$el).find('.team-header').toggleClass('onScreen offScreen');
				$(this.$el).find('.team-content').toggleClass('onScreen offScreen');
				setTimeout(() => {
					done();
				},700);
			},
			switchRoster(el){
				if (el.target.parentElement.className !== 'active'){
					this.main_roster = !this.main_roster;
				}
			}
		},
		created(){
			const path = this.$route.path;
            const data_src = 'src/data' + path + '/data.json';
            
            axios.get(data_src).
            	then(response => {
                	this.team_data = response.data;
                	console.log(this.team_data);
            	}).catch(error => {
                	console.log(error);
            	});
		},
		mounted(){
			$(document).on('mouseenter', '.team-container:visible .team-item', function(){
				var img = $(this).data("img");
				setTimeout(function(){
					$('.background-pic').css('background-image', img);
					$('.background-pic').addClass('active');
				}, 300);
			});

			$(document).on('mouseleave', '.team-container:visible .team-item', function(){
				$('.background-pic').removeClass('active');
				setTimeout(function(){
					$('.background-pic').css('background-image', 'none');
				}, 300);
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
		opacity: 0;
		background-position: center 0;
		background-size: cover;
		transition: all .3s;
		&.active{
			opacity: 0.4;
		}
	}
	.small-view{
		background-color: transparent;
	}
	.team{
		width: 70%;
		padding: 0px 5px;
		.team-header{
			display: flex;
			align-items: flex-end;
			margin-top: 5%;
			transition: all .35s;
			&.offScreen{
				opacity: 0;
			}
			&.onScreen{
				opacity: 1;
			}
			h2{
				width: 50%;
				color: #fff;
				font-size: 2.6vw;
				font-weight: 200;
				margin: 0px;
				line-height: 100%;
			}
			.worker-switch{
				width: 50%;
				text-align: right;
				margin: 0px;
				li{
					display: inline-block;
					margin-right: 40px;
					&:last-child{
						margin-right: 0px;
					}
					&.active{
						button{
							opacity: 1;
						}
					}
					button{
						background-color: transparent;
						color: #fff;
						border: none;
						opacity: 0.7;
						transition: all .35s;
					    font-size: 18px;
    					font-weight: 200;
    					cursor: pointer;
    					outline: none;
    					&:hover{
    						opacity: 1;
    					}
					}
				}
			}
		}
		.team-content{
			margin-top: 80px;
			transition: all .35s;
			&.offScreen{
				opacity: 0;
			}
			&.onScreen{
				opacity: 1;
			}
			.team-container{
				display: flex;
				flex-flow: row wrap;
				position: absolute;
				width: 100%;
			}
			.team-item{
				position: static;
				opacity: 1;
			    transform: translateX(0px);
				width: 25%;
				color: #fff;
				margin-bottom: 6%;
				&:hover{
					&:before{
					    left: -14px;
					}
				}
				&:before{
				    top: 10%;
    				left: -30px;
				}
				.name{
					width: 35%;
					font-weight: 800;
					margin-bottom: 20px;
				}
				.rank{
					width: 35%;
					font-size: 16px;
				}
			}
		}
	}

	@media (max-width: 1367px){
		.team .team-content{
			margin-top: 40px;
		}
		.team .team-header{
			margin-top: 2%;
		}
		.team .team-content .team-item .name {
		    width: 45%;
		    font-size: 18px;
		    font-weight: 800;
		    margin-bottom: 14px;
		}
		.team .team-content .team-item{
			margin-bottom: 4%;
		}
	}

	@media (max-width: 1025px){
		.team .team-header h2{
			font-size: 4.6vw;
		}
		.team .team-header .worker-switch li button{
			font-size: 16px;
		}
		.team .team-header .worker-switch li{
			margin-right: 20px;
		}
		.team .team-header .worker-switch li:last-child{
			margin-right: 0px;
		}
		.team .team-content{
			margin-top: 70px;
		}
		.team .team-content .team-item{
			margin-bottom: 6%;
		}
	}

	@media (max-width: 768px){
		.team .team-header h2{
			width: 30%;
		}
		.team .team-header .worker-switch{
			width: 70%;
		}
		.team .team-content .team-item{
			width: 33%;
			margin-bottom: 10%;
		}
	}

	@media (max-width: 469px){
		.team .team-header{
			flex-flow: row wrap;
			margin-top: 0px;
		}
		.team .team-header .worker-switch li button{
			padding: 0px;
		}
		.team .team-header h2{
			width: 100%;
			margin-bottom: 20px;
			font-size: 8vw;
		}
		.team .team-header .worker-switch{
			width: 100%;
			text-align: left;
			padding: 0px;
		}
		.team{
			width: 95%;
		}
		.team .team-content{
			margin-top: 40px;
		}
		.team .team-content .team-item .name{
			width: 100%;
			font-size: 16px;
			margin-bottom: 10px;
		}
		.team .team-content .team-item .rank{
			width: 90%;
			font-size: 14px;
		}
	}
	@media (max-width: 321px){
		.team .team-header .worker-switch li{
			margin-right: 10px;
		}
		.team .team-content .team-item{
			margin-bottom: 4%;
		}
		.team .team-header h2{
			margin-bottom: 15px;
		}
		.team .team-content{
			margin-top: 24px;
		}
	}

</style>