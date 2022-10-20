import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function PageViews({ views }) {
  return (
    <div className="views">
      {views && (
        <>
          {views}
          <FontAwesomeIcon icon={faEye} />
        </>
      )}
    </div>
  );
}
