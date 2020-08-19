import React from 'react';
import { sectionContext } from '../App.js';
import Header from './Header.js';
import Section1 from './Section1.js';
import Section2 from './Section2.js';
import Section3 from './Section3.js';
import Section4 from './Section4.js';

const hrefSectionList = [
  { href: 'header', section: Header },
  { href: 'about-me', section: Section1 },
  { href: 'education', section: Section2 },
  { href: 'skills', section: Section3 },
  { href: 'projects', section: Section4 },
];
const hrefList = hrefSectionList.map(hrefSection => hrefSection.href);
const hrefSectionMap = Object.assign({}, ...hrefSectionList.map(hrefSection => ({ [hrefSection.href]: hrefSection.section })));
const animationDuration = 250;

function Section(props) {
  const context = React.useContext(sectionContext);
  const TagName = hrefSectionMap[props.href];
  return (
    <TagName href={props.href} position={context.sectionsPosition[props.href].position}/>
  );
}

export { hrefList, hrefSectionMap, animationDuration };
export default Section;