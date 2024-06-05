'use client'

import { NavbarItem } from '@nextui-org/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

type NavLinkProps = {
    href: string,
    label: string,
}

export default function NavLink({href, label}: NavLinkProps) {
    const pathName = usePathname();
  return (
    //is active is set to true if the pathname is the same as the href...in other words, if you're on the page you clicked the link for, it should look "active"
    <NavbarItem isActive={pathName === href} as={Link} href={href}>{label}</NavbarItem>

  )
}
