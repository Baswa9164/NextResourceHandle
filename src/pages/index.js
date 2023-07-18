import Link from 'next/link';
import useSWR from 'swr';
import { Table,Button} from '@nextui-org/react';

export default function Home() {
const {data,error,mutate} =useSWR('/',fetchData);

if(error){
    return(
        <>
        ERROR
        </>
    )
}
if(!data){
    return (
        <>
        Loading!!!!
        </>
    )
}

const DelItem =async (id)=>{
console.log(id + "inside Delete Item");
const response =await fetch(`/api/${id}`,{
    method:'DELETE'
});
mutate();
}





return ( 
    <div>
    <h1>Next Js Records Manager</h1>
      <Table
      aria-label="Example table with static content"
      css={{
        height: "auto",
        minWidth: "100%",
      }}
    >
       <Table.Header>
        <Table.Column>ID</Table.Column>
        <Table.Column>NAME</Table.Column>
        <Table.Column>GENDER</Table.Column>
        <Table.Column>AGE</Table.Column>
        <Table.Column>Delete</Table.Column>
      </Table.Header>
      <Table.Body>
        {data.map((employee,i) => (
          <Table.Row key={i}>
            <Table.Cell>{i+1}</Table.Cell>
            <Table.Cell>{employee.name}</Table.Cell>
            <Table.Cell>{employee.gender}</Table.Cell>
            <Table.Cell>{employee.age}</Table.Cell>
            <Table.Cell>
                <Button size='xs' onClick={()=>DelItem(employee.id)}>Delete</Button> 
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
    <Link href="/new" underline='false'>
      <Button color="secondary" auto >ADD New Record</Button>
      </Link>
     
    </div>
  )
}
const fetchData=async ()=>{
    const response=await fetch(`/api`,{
        method:'GET'
    })
    const data = await response.json();

    return data;
}
  