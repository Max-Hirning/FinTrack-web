import React from "react";

export default function Home() {
  return (
    <main>
      <section className="card w-[730px] h-[322px] p-[20px]">
        <input className="input" placeholder="Hello world"/>
        <h1 className="truncate">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore accusamus veritatis suscipit voluptas pariatur labore quidem eveniet dolorum, laudantium maiores ipsam exercitationem possimus dignissimos. Pariatur unde repellendus officiis quae vel.</h1>
      </section>
      <section className="card w-[730px] h-[322px] p-[20px]">
        <h1 className="truncate">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore accusamus veritatis suscipit voluptas pariatur labore quidem eveniet dolorum, laudantium maiores ipsam exercitationem possimus dignissimos. Pariatur unde repellendus officiis quae vel.</h1>
      </section>
      <button className="button w-[190px] h-[50px]">Save</button>
      <button className="text-button w-[190px] h-[50px]">Save</button>
      <button className="outlined-button w-[190px] h-[50px]">Save</button>
    </main>
  );
}