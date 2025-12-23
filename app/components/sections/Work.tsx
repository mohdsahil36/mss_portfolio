import Image from "next/image";
import Profile from "@/public/Profile.jpg";
import { workExperience } from "@/app/data/workExperience";

export default function Work() {
  return (
    <section className="mt-5 mb-2 rounded-md border border-zinc-800 p-4">
      <h1 className="mb-4 text-white text-lg font-semibold">Work Experience</h1>

      <div className="flex flex-col gap-4">
        {workExperience.map((item, index) => {
          const isCurrent = item.type === "current";

          return (
            <article
              key={index}
              className="flex gap-4 border border-zinc-800 p-4 rounded-md"
            >
              {/* Avatar */}
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border border-zinc-700">
                <Image
                  src={Profile}
                  alt={item.imageAlt}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <div className="flex flex-col gap-2 flex-1">
                <header className="flex items-center justify-between">
                  <h2 className="text-white font-semibold">{item.company}</h2>

                  {/* Status indicator (ONLY color changes) */}
                  <span
                    className={`flex items-center gap-1 rounded-full px-3 py-0.5 text-xs border ${
                      isCurrent
                        ? "bg-emerald-900/30 text-emerald-400 border-emerald-800"
                        : "bg-amber-900/30 text-amber-400 border-amber-800"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        isCurrent ? "bg-emerald-400" : "bg-amber-400"
                      }`}
                    />
                    {item.status}
                  </span>
                </header>

                <p className="text-white text-sm">{item.role}</p>

                <p className="text-neutral-400 text-sm leading-relaxed">
                  {item.description}
                </p>

                {/* Tech stack (UNCHANGED colors) */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {item.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="bg-zinc-800 px-2 py-1 rounded text-xs text-neutral-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
