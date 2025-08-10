import React from "react";

interface FloatingIcon {
  icon: string;
  delay: string;
  duration: string;
  position: string;
}

const FloatingIcons: React.FC = () => {
  // Generate random integer between min and max (inclusive)
  const randomInt = (min: number, max: number): number =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  const iconNames: string[] = [
    "devicon-javascript-plain",
    "devicon-typescript-plain",
    "devicon-nodejs-plain",
    "devicon-react-original",
    "devicon-go-plain",
    "devicon-python-plain",
    "devicon-mongodb-plain",
    "devicon-postgresql-plain",
    "devicon-docker-plain",
    "devicon-amazonwebservices-plain-wordmark",
    "devicon-kubernetes-plain",
    "devicon-git-plain",
    "devicon-terraform-plain",
  ];

  // Generate icons with random delays and durations
  const icons: FloatingIcon[] = iconNames.map((iconName) => ({
    icon: iconName,
    delay: `${randomInt(1, 10)}s`,
    duration: `${randomInt(10, 20)}s`,
    position: `${Math.random() * 100}%`,
  }));

  return (
    <div className="floating-icons">
      {icons.map((item, index) => (
        <i
          key={index}
          className={`${item.icon} floating-icon`}
          style={
            {
              "--delay": item.delay,
              "--duration": item.duration,
              "--start-position": item.position,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
};

export default FloatingIcons;
