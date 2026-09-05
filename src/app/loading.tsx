import { LoadingScreen } from "@/components/LoadingScreen";

export default function Loading() {
  return (
    <div className="flex min-h-dvh justify-center bg-plum">
      <div className="relative h-dvh w-full max-w-[390px] overflow-hidden bg-plum">
        <LoadingScreen />
      </div>
    </div>
  );
}
