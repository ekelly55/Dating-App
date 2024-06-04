import { Button } from "@nextui-org/react";
import Link from "next/link";
import { FaRegSmile } from "react-icons/fa";
import './globals.css'


export default function Home() {


  return (
    <div>

      <h1 className="text-3xl text-primary">hello world</h1>
        <Button
          as={Link}
          href='/members' 
          color='primary' 
          variant='bordered' 
          startContent={<FaRegSmile size={20}/>}>
           click it
        </Button>
    </div>
  );
}
