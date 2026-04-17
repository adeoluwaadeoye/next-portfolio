async function getData() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return [];
}

export default async function Page() {
  await getData();

  return <div>Projects Page</div>;
}