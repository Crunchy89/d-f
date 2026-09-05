export function GuestGreeting({
  name,
  dearClassName,
  nameClassName,
}: {
  name: string;
  dearClassName: string;
  nameClassName: string;
}) {
  if (!name) return null;

  return (
    <div>
      <p className={dearClassName}>Dear</p>
      <p className={nameClassName}>{name}</p>
    </div>
  );
}
