import { AssetLoader } from "@/components/AssetLoader";
import { EnvelopeCover } from "@/components/EnvelopeCover";
import { Invitation } from "@/components/Invitation";
import { StageBackground } from "@/components/StageBackground";
import { guestNameFromQuery } from "@/lib/guest";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ name?: string | string[] }>;
}) {
  const guestName = guestNameFromQuery((await searchParams).name);

  return (
    <div className="flex min-h-dvh justify-center bg-plum">
      <div className="relative h-dvh w-full max-w-[390px] overflow-hidden bg-plum">
        <AssetLoader>
          <StageBackground />
          <div className="relative z-10 h-full">
            <EnvelopeCover guestName={guestName}>
              <Invitation />
            </EnvelopeCover>
          </div>
        </AssetLoader>
      </div>
    </div>
  );
}
