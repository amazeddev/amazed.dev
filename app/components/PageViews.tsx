import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface PageViewsProps {
  views?: number;
}

const PageViews: React.FC<PageViewsProps> = ({ views }) => {
  return (
    <div className="views">
      {views && (
        <>
          {views}
          <FontAwesomeIcon icon={faEye as any} />
        </>
      )}
    </div>
  );
};

export default PageViews;
