import catstuff from "@/assets/catstuff.gif";
import declaw from "@/assets/declaw1.gif";

export const Footer = () => {
  return (
    <div className="w-full">
      <hr className="rounded border-gray-500/20 mb-2" />
      <div className="flex flex-wrap items-center gap-2">
        <img
          src={declaw}
          className="h-8 hover:scale-120 transition"
          alt={`A banner advising against declawing cats with the text "Save a paw - don't declaw."`}
        />
        <a href="https://user.xmission.com/~emailbox/catstuff.htm">
          <img
            src={catstuff}
            className="h-8 hover:scale-120 transition"
            alt="Graphics from CatStuff"
          />
        </a>
      </div>
    </div>
  );
};
