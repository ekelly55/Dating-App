import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";
import { GiMatchTip } from "react-icons/gi";
import React from 'react'
import Link from "next/link";
import NavLink from "./NavLink";

export default function TopNav() {
  return (
    <Navbar 
        maxWidth="xl"
        className='bg-gradient-to-r from-purple-400 to-purple-700'
       >
        <NavbarBrand>
            <GiMatchTip size={40}/>
            <div className="font-bold text-3xl flex">
                <span>Next</span>
                <span>Match</span>
            </div>
        </NavbarBrand>
        <NavbarContent justify="center">
            <NavLink href='/members' label="Members"/>
            <NavLink href='/lists' label="lists"/>
            <NavLink href='/messages' label="Messages"/>
        </NavbarContent>
        <NavbarContent justify="end">
            <Button as={Link} href='/login' variant='bordered' className='text-white'>Login</Button>
            <Button as={Link} href='/register' variant='bordered' className='text-white'>Register</Button>
        </NavbarContent>
    </Navbar>
  )
}
