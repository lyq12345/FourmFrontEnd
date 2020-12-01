/**
 * recoil 只能使用在FC中，所以使用这个包裹一下
 */
import React from 'react';
import { RecoilRoot } from 'recoil';

const RecoilLayout: React.FC = ({ children }) => <RecoilRoot>{children}</RecoilRoot>;

export default RecoilLayout;
