
import { employees } from "../../../data/employee";

export default function handler(req,res)
{
    let {method} = req;

    switch(method){
    case 'GET':
        res.status(200).json(employees);
    break;
    case 'POST':
        req.body.id = Date.now();
           employees.push(req.body);
           res.status(201).json({"message":"uploading successful"})
        break;
    case 'DELETE':
       let [employeeId ] = req.query.params;
   
       let i = -1;
       for(let j in employees){ 
    if(employees[j].id == employeeId){
      i=j;break;
    }
   }
     employees.splice(i,1);
 res.status(202).json(employees);
         break;
    default:
        res.status(404).json({"error":"No such Methods Found"});
}
};