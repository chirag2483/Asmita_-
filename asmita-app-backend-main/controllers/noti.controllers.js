import Fixture from "../models/fixture.schema.js";
import LogDetails from "../models/logDetails.schema.js";
import User from "../models/user.schema.js";
import {
    response_200,
    response_400,
    response_404,
    response_500,
} from "../utils/responseCodes.js";
import axios from "axios";

export async function sendNoti(req,res){
    try{
        const data={
            to: "/topics/all",
            notification: {
              title: req.body.title,
              body: req.body.body,
              mutable_content: true,
              sound: "Tri-tone"
              }  
        }
        const token="AAAAb6gnCaA:APA91bH6MgkESR5hma1KSR9u2GO7UAlLi5wlXlpEYqsZnPJYAmEcfqKmXWJCqcStkY4IvoRpibE4E1mBobhyjjjKgFnJ9jtUeiQyQJomC0htcdT7GjMIge8Rxu7shcDXzwIqxzwpelgi"
        const config = {
            headers: { 
                Authorization: `Bearer ${token}`, 
                'Content-Type': "application/json",
            },
            
        };
        await axios.post("https://fcm.googleapis.com/fcm/send",data,config).then(async()=>{
        response_200("Message sent ");
        const agent = await User.findById(req.user.id);
        const details="Sent Notification with title " + req.body.title + " and body "+ req.body.title;
        const newLog = await LogDetails.create({
            enrollment_no: agent.EnrollmentNo,
            details,
        });})
        .catch((err)=>response_500(res, "Error occurred while sending notification ", err))
    }
    catch(err){
        response_500(res, "Error in backend ", err)
    }
}