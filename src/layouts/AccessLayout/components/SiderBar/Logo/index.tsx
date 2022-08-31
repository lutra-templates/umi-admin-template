import React from 'react';
import { SketchOutlined } from '@ant-design/icons';
import styles from './index.less';
import { urlReg } from '@/utils/validators';
export interface LogoProps {
  title: string;
  logo: string;
}

const Logo: React.FC<LogoProps> = ({ title, logo }) => {
  const isUrl = urlReg.test(logo);
  const iconStyle={ fontSize: 26 }
  const spanStyle={ marginLeft: 10}
  return (
    <h1 className={styles.logo}>
      {logo ? (
        <img
          className={styles.logoImg}
          src={isUrl ? logo : require(`${logo}`)}
          alt="logo"
        />
      ) : (
        <SketchOutlined style={iconStyle} />
      )}

      <span style={spanStyle}>{title}</span>
    </h1>
  );
};

export default Logo;
