import React, {useState, useEffect} from 'react';
import Icon from '@material-ui/core/Icon'
import { makeStyles } from '@material-ui/styles'

import {SocialMediaIconsReact} from 'social-media-icons-react'


 function StartHeader() {

    const [svgGithub, setSvgGithub] = useState(45)
    const [svgFacebook, setSvgFacebook] = useState(40)
    const [svgInstagram, setSvgInstagram] = useState(40)

    const customStyles = makeStyles({
        root:{
            margin: 0,
            width: '1.85em',
            height: '1.85em',
            marginBottom: '.45em',
            marginLeft: '.15em'
        },

        imgIcon: {
            width: '100%',
            height: '100%'
        },

        spanTitle: {
            marginLeft: '.5em'
        }
    })

    function svgResize(){
        if(window.outerWidth >=590 && window.outerWidth < 843) {
            setSvgGithub(40)
            setSvgFacebook(36)
            setSvgInstagram(38)
        } else if(window.outerWidth >= 461 && window.outerWidth < 590){
            setSvgGithub(37)
            setSvgFacebook(34)
            setSvgInstagram(36)
        } else if(window.outerWidth >=420 && window.outerWidth < 461){
            setSvgGithub(33)
            setSvgFacebook(30)
            setSvgInstagram(30)
        } else if(window.outerWidth >= 360 && window.outerWidth < 420) {
            setSvgGithub(29)
            setSvgFacebook(27)
            setSvgInstagram(27)
        } else if(window.outerWidth < 360){
            setSvgGithub(27)
            setSvgFacebook(25)
            setSvgInstagram(25)
        } else{
            setSvgGithub(45)
            setSvgFacebook(40)
            setSvgInstagram(40)
        } 

    }

    useEffect(() => {
        svgResize() 
        window.addEventListener('resize', svgResize) 
    }, [])

    const classes = customStyles()
    return (
        
        <div className="header-start">
            <Icon component='div'> <img src="https://image.flaticon.com/icons/svg/2843/2843783.svg"/></Icon>
            <div id="header-title">COVID-19
                <span className={classes.spanTitle}>Tracker</span>
                <Icon className={classes.root} ><img className={classes.imgIcon} src="https://image.flaticon.com/icons/svg/854/854878.svg"/></Icon>
            </div>
            <div className="header-source">
                Follow 
                <SocialMediaIconsReact  icon="github" iconColor="rgba(33, 31, 31, 1)" 
                 backgroundColor="#fff" iconSize="8" roundness="50%" url="https://github.com/rafat17" size={`${svgGithub}`} />
                <SocialMediaIconsReact icon="facebook" iconColor="rgba(255,255,255,1)" 
                 backgroundColor="rgba(59,89,152,1)" iconSize="1" roundness="50%" url="https://www.facebook.com/raf1704" size={`${svgFacebook}`} />
                <SocialMediaIconsReact icon="instagram" iconColor="rgba(255,255,255,1)" 
                 backgroundColor="rgba(221,42,125,1)" iconSize="2.5" roundness="50%" url="https://www.instagram.com/_rafat17_/" size={`${svgInstagram}`} />
            </div>
        </div>
    )
}

export default StartHeader

