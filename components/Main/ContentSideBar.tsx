import ProfileCard from "./Card";

export default function ContentSideBar() {
  return (
    <div className="h-full w-2xl  flex flex-col bg-neutral-100 dark:bg-neutral-900 justify-start gap-4 border items-center rounded-xl p-2 pt-4 overflow-y-scroll">
      <ContentHeader />

      <ProfileCard />
    </div>
  );
}

export function ContentHeader() {
  return (
    <div>
      <p className="font-bold text-xl ">Campus Connection</p>
    </div>
  );
}
