import React from "react";

const FloatingIcons = () => {
  // Generate random integer between min and max (inclusive)
  const randomInt = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  const iconNames = [
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
  const icons = iconNames.map((iconName) => ({
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
          style={{
            "--delay": item.delay,
            "--duration": item.duration,
            "--start-position": item.position,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingIcons;
