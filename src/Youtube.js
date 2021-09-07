import {useState} from "react";
import React from "react";
import axios from "axios";

const Youtube = () => {

   const[playlist,setPlayList]  = useState([]);
   const[channelId,setChannelId]  = useState('UCK8sQmJBp8GCxrOtXWBpyEA');
   const[maxRec,setMaxRec]  = useState('15');
   const API = 'AIzaSyD9gV2AVci0RZDXEtm7IN0bu-JiQZSkCMg';

   let finalUrl = `https://embed-youtube.herokuapp.com/${channelId}/${maxRec}`;

   const onClick = () => {
       axios.get(finalUrl)
           .then(res => {
               setPlayList(res.data.playlist);
           });
   }

    return(
        <>
            <div className="p-5 container">
                Channel ID:
                <input name="channelId" value={channelId} onChange={(e)=> {setChannelId(e.target.value)}} className="form-control"/>
                Max Records:
                <input name="maxRec" value={maxRec} onChange={(e)=> {setMaxRec(e.target.value)}} className="form-control"/>
                <button onClick={onClick} className="mt-3 btn-primary">Show Playlist</button>
            </div>
            {
                playlist && playlist.map((link,index) => {
                  let frame =
                              <iframe key={index} width="560" height="315" src={link} title="video"
                                      frameBorder="0"
                                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                      allowFullScreen>
                              </iframe>
                    return frame;
                })
            }
        </>
    )

}

export default Youtube;