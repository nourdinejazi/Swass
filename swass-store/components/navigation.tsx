"use client";
import Link from "next/link";

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export function Navigation({ pathArr }: { pathArr?: string[] }) {
  if (!pathArr) return null;

  return (
    <Breadcrumb className="p-4">
      <BreadcrumbList>
        <span className="flex items-center gap-2  ">
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Accueil</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbEllipsis className="h-4 w-4" />
          <BreadcrumbSeparator />
        </span>
        {pathArr.map((path) => (
          <span className="flex items-center gap-2  " key={path}>
            {!(pathArr.indexOf(path) === pathArr.length - 1) ? (
              <span className="flex items-center gap-2">
                <BreadcrumbItem>
                  <BreadcrumbLink className="" href="#">
                    {path}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </span>
            ) : (
              <BreadcrumbItem>
                <BreadcrumbPage>{path}</BreadcrumbPage>
              </BreadcrumbItem>
            )}
          </span>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
// <BreadcrumbItem>
//   <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
// </BreadcrumbItem>;
