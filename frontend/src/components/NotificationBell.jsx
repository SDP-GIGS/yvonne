import {useEffect,useState} from "react";
import {notificationAPI} from "../api/apiService";


export default function NotificationBell(){

const [notifications,setNotifications]=useState([]);



const loadNotifications=()=>{

notificationAPI
.getNotifications()
.then(res=>{
setNotifications(res.data)
})

}



useEffect(()=>{


loadNotifications();


const interval=setInterval(
loadNotifications,
15000
);


return ()=>clearInterval(interval);


},[]);



return (

<div>

<button>
🔔 {notifications.filter(n=>!n.is_read).length}
</button>


<div>

{
notifications.map(n=>(

<div key={n.id}>

<p>{n.message}</p>

<small>
{new Date(n.created_at).toLocaleString()}
</small>


</div>

))
}


</div>


</div>

)

}