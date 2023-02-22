import React, { useState } from 'react';
import { Nav, NavItem, NavLink, TabContent, TabPane, Table } from 'reactstrap';

import './WatchInfo.css';

const WatchInfo = ({ watch, className }) => {
    const [activeTab, setActiveTab] = useState('1');

    if(!watch) return null;

    return (
        <div className={ className }>
            <Nav tabs>
                <NavItem>
                    <NavLink className={activeTab === '1' ? 'active' : 'watch-info_tabs'} onClick={() => setActiveTab('1')}>
                        Description
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className={activeTab === '2' ? 'active' : 'watch-info_tabs'} onClick={() => setActiveTab('2')}>
                        Characteristics
                    </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                    <h3 className="text-white mt-3">Lorem Ipsum</h3>
                    <p className="text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed interdum eget eros vel maximus. Mauris semper lorem ac nulla sagittis, molestie finibus urna bibendum. Donec et augue feugiat, fringilla diam a, congue nibh. Quisque a nunc enim. Phasellus malesuada pretium leo, id facilisis turpis varius quis. Phasellus eleifend magna ex, at rutrum diam rhoncus et. Praesent in eros nec est posuere malesuada. Suspendisse elit nisi, semper in purus at, ultricies rutrum ante. Vivamus lorem nunc, ullamcorper nec eros eu, molestie molestie erat. Cras et erat nec leo pulvinar consectetur. Aliquam erat volutpat. In eget pellentesque felis. Nullam faucibus porttitor risus nec condimentum. Maecenas eget faucibus turpis, et dapibus elit. Nunc ex neque, ullamcorper vitae suscipit vitae, volutpat vel urna. </p>
                    <h3 className="text-white">Sollicitudin ex</h3>
                    <p className="text-white">Nunc a sollicitudin ex. Donec eget enim ac lacus tempor vestibulum. Suspendisse sed massa at magna consectetur vulputate. Vivamus efficitur nec sem eu tincidunt. Cras vitae nibh laoreet, facilisis orci id, sodales velit. Mauris rutrum rutrum odio. Nullam finibus scelerisque purus vitae accumsan. Maecenas quis placerat magna. Ut dapibus leo eu odio pharetra elementum. </p>
                    <h3 className="text-white">Praesent</h3>
                    <p className="text-white">Praesent eget erat at magna dapibus euismod. Ut placerat sodales ex, sed maximus justo tincidunt et. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin id convallis lacus, sit amet aliquet arcu. Praesent accumsan nec eros in convallis. Maecenas viverra laoreet lorem, a facilisis urna efficitur volutpat. In ligula magna, fermentum sit amet porttitor sit amet, laoreet nec neque. Nunc luctus elit euismod tincidunt sollicitudin. Pellentesque cursus eros a magna ornare, eu ultrices metus vulputate. Sed vel magna eu mauris fermentum tempor sed ac leo. Etiam dignissim justo dolor, sed vulputate turpis tincidunt ac. Etiam eu diam in leo interdum tincidunt ac id diam. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras sagittis mauris ac lectus sodales, eget scelerisque lectus tincidunt. Maecenas suscipit metus nunc, in molestie ipsum fermentum vitae. Nulla sed ante orci. </p>
                </TabPane>
                <TabPane tabId="2">
                    <Table dark>
                        <tbody>
                            <tr>
                                <td>Model</td>
                                <td>{ watch.model }</td>
                            </tr>
                            <tr>
                                <td>Producer</td>
                                <td>{ watch.producer && watch.producer.producerName }</td>
                            </tr>
                            <tr>
                                <td>Mechanism</td>
                                <td>{ watch.category && watch.category.categoryName }</td>
                            </tr>
                        </tbody>
                    </Table>
                </TabPane>
            </TabContent>
        </div>
    );
}

export default WatchInfo;