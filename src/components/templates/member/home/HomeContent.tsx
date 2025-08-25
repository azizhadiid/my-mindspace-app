'use client'

import { Fragment } from "react";

// Component
import SectionTwo from "../../welcome/section/SectionTwo";
import SectionThree from "../../welcome/section/SectionThree";
import SectionFour from "../../welcome/section/SectionFour";
import SectionFive from "../../welcome/section/SectionFive";
import SectionOneMember from "./SectionOneMember";

const HomeContentMember = () => {
    return (
        <Fragment>
            {/* Hero Section */}
            <SectionOneMember />

            {/* About Section */}
            <SectionTwo />

            {/* Service Section */}
            <SectionThree />

            {/* Therapies Section */}
            <SectionFour />

            {/* Contact Section */}
            <SectionFive />

        </Fragment>
    );
};

export default HomeContentMember;