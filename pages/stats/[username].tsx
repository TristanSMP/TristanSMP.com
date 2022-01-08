import axios from "axios";
import { NextPage } from "next";
import * as skinview3d from "skinview3d";

type mcmmoData = {
  repair: number;
  fishing: number;
  axes: number;
  swords: number;
  powerLevel: number;
  alchemy: number;
  Herbalism: number;
  mining: number;
  error: boolean;
  acrobatics: number;
  woodcutting: number;
  excavation: number;
  unarmed: number;
  archery: number;
  taming: number;
};

interface Props {
  username: string;
  mcmmoData: mcmmoData;
  uuid: string;
}

const skillNameMap = {
  repair: "Repair",
  fishing: "Fishing",
  axes: "Axes",
  swords: "Swords",
  powerLevel: "Power Level",
  alchemy: "Alchemy",
  Herbalism: "Herbalism",
  mining: "Mining",
  acrobatics: "Acrobatics",
  woodcutting: "Woodcutting",
  excavation: "Excavation",
  unarmed: "Unarmed",
  archery: "Archery",
  taming: "Taming"
};

export async function getServerSideProps(context: {
  query: { username: string };
}) {
  const uuid = await axios
    .get(
      `https://tristansmp.com/api/usernameLookup?username=${context.query.username}`
    )
    .then((res) => res.data.uuid)
    .catch(() => null);

  return {
    props: {
      username: context.query.username,
      mcmmoData: await axios
        .get<mcmmoData>(`https://tristansmp.com/api/mcmmo?uuid=${uuid}`)
        .then((res) => res.data)
        .catch(() => ({ error: true })),
      uuid: uuid
    }
  };
}
const User: NextPage = (props) => {
  const defp = props as Props;
  const username = defp.username;
  const mcmmoData: mcmmoData = defp.mcmmoData;
  const uuid = defp.uuid;

  while (!uuid) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-white text-4xl drop-shadow-2xl">
        Hey it seems like this username doesn&apos;t exist.
      </div>
    );
  }

  while (mcmmoData.error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-white text-4xl drop-shadow-2xl">
        Hey it seems like this username doesn&apos;t exist.
      </div>
    );
  }
  return (
    <>
      <head>
        <title>{username} - TSMPstats</title>
        <meta content={`${username}, TSMP Stats`} property="og:title" />
        <meta
          content={`TSMP Stats for ${username}. Their Power Level is ${
            mcmmoData?.powerLevel ?? 0
          }`}
          property="og:description"
        />
        <meta content="https://stats.tristansmp.com/" property="og:url" />
        <meta
          content={`https://crafatar.com/renders/body/${uuid}`}
          property="og:image"
        />
      </head>

      <section className="">
        <div className="flex items-center justify-center h-screen">
          <div className="py-8 text-center text-white text-3xl px-10 m-10 font-extrabold">
            <canvas
              id="skinviewer"
              className="w-full h-full"
              ref={(canvas) => {
                if (!canvas) return;
                if (!canvas?.width) return;
                if (!canvas?.height) return;
                let skinViewer = new skinview3d.SkinViewer({
                  canvas: canvas!,
                  width: 300,
                  height: 400,
                  skin: `https://crafatar.com/skins/${uuid}`
                });
                // Control with mouse
                let control = skinview3d.createOrbitControls(skinViewer);
                control.enableRotate = true;
                control.enableZoom = false;
                control.enablePan = false;
                let run = skinViewer.animations.add(
                  skinview3d.RunningAnimation
                );
                // Set the speed of the running animation
                run.speed = 0.5;
              }}
            />
            {username}
          </div>
          <div className="relative flex flex-col min-w-0 rounded-lg break-words bg-gray-900 ">
            <div className="py-3 px-6 mb-0 bg-gray-200 rounded-t-lg text-gray-900">
              <strong>McMMO Stats</strong>
            </div>
            <div className="flex-auto p-8 py-1 bg-gray-800">
              {
                // for every skill in the mcmmo data object we create a div with the skill name and the skill level
                Object.keys(mcmmoData!).map((skill) => {
                  if (skill == "error") {
                    return;
                  }
                  return (
                    <>
                      <div className="flex flex-wrap no-gutters items-center">
                        <div className="relative flex-grow max-w-full flex-1 px-8 lg:order-1 pr-4 pl-4 text-gray-300">
                          {/* @ts-ignore */}
                          <p>{skillNameMap[skill]}:</p>
                        </div>
                        <div
                          className="w-full lg:order-2 relative lg:flex-grow lg:flex-1"
                          style={{ fontSize: "90%" }}
                        >
                          <p className="text-gray-200 font-extrabold text-xl font-mono">
                            {/* @ts-ignore */}
                            {mcmmoData![skill] > 0 ? mcmmoData![skill] : "-"}
                          </p>
                        </div>
                      </div>
                    </>
                  );
                })
              }
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default User;
