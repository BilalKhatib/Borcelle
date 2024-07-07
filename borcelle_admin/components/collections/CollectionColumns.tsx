"use client"

import { ColumnDef } from "@tanstack/react-table"
import Delete from "../custom ui/Delete"
import Image from "next/image"
import Link from "next/link"

export const columns: ColumnDef<CollectionType>[] = [
  {
    accessorKey: "image",
    header: "Image",
    cell: ({row}) => <Image src={row.original.image} alt="collection image" width={50} height={50} />
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({row}) => <Link href={`/collections/${row.original._id}`} className="hover:text-red-1">{row.original.title}</Link>
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({row}) => <p>{row.original.description}</p>
  },
  {
    accessorKey: "products",
    header: "Products",
    cell: ({row}) => <p>{row.original.products.length}</p>
  },
  {
    id: "actions",
    cell: ({row}) => <Delete id={row.original._id} />
  },
]
