import { ChevronLeft } from "lucide-react";
import { OrangeButton } from "../Buttons/OrangeButton";
import "./Market.scss";

export function Market(): JSX.Element {
  return (
    <div className="marketPageWrapper">
      <div className="tableWrapper">
        <h1 className="subtitle afacad">Current Market Stats</h1>
        <p className="paragraph-text">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum delectus, non aspernatur
          nostrum earum alias porro incidunt ducimus officia illum quisquam asperiores. Quod
          blanditiis, accusantium minus dignissimos fugit magni dicta sunt reiciendis recusandae
          assumenda illo sed nesciunt nostrum? Sequi ex consequuntur iure officiis dolorem pariatur
          autem maxime ab repudiandae exercitationem repellendus earum at laboriosam porro voluptate
          obcaecati cupiditate, ullam, sint itaque et unde ea! Dicta nihil quam ratione vero ea
          recusandae sit soluta ipsum quod quaerat, repudiandae at sunt eligendi beatae, fugit
          repellendus eum veniam esse. Dolorem excepturi animi, nobis mollitia est magni cumque
          exercitationem similique voluptatum, itaque sed. Totam.
        </p>
        <div className="m-large">
          <OrangeButton
            buttonText="back"
            size="tiny"
            href="/"
            leftIcon={<ChevronLeft size={18} />}
          />
        </div>
      </div>
    </div>
  );
}
