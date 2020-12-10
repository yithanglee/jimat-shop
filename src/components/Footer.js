import React from 'react';
import { NavLink } from 'react-router-dom';
import Icon from 'components/Icon';
import 'style/footer.scss';

const socialProfiles = [
  {
    id: 1,
    name: 'instagram',
    link: 'https://www.instagram.com/jimat.co_/',
  },
  {
    id: 2,
    name: 'facebook',
    link: 'https://www.facebook.com/JiMATMarketplace/',
  },
  { id: 3, name: 'twitter', link: 'https://twitter.com/KamiJiMAT_' },
];

const Footer = () => {
  return (
    <footer>
      <div className="social">
        {socialProfiles.map(social => {
          return (
            <a
              href={social.link}
              rel="noopener noreferrer"
              target="_blank"
              key={social.id}
            >
              <Icon type={social.name} stroke="none" fill="#738091" />
            </a>
          );
        })}
      </div>
      <p className="text-sm leading-5 font-medium text-gray-800">
        <NavLink exact to="/policy">
          Privacy Policy&nbsp;
        </NavLink>
        | Terms of use - All Rights Reserved with JiMAT
      </p>
    </footer>
  );
};

export default Footer;
