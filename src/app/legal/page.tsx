import StripePayButton from "@/components/StripePayButton";
import { Button } from "@/components/ui/button";
import React from "react";

function page() {
    return (
        <main>
            <section className="container flex flex-col justify-center items-left ">
                <div className="text-left mx-auto max-w-4xl pb-14 ">
                    <h1 className="statement  text-2xl text-white">Privacy Policy</h1>
                    <p className=" max-w-2xl mx-auto  ">This Privacy Policy explains how we collect, use, store, and protect your personal data when you visit our website or purchase our products. We are committed to handling your data lawfully, fairly, and transparently in accordance with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.</p>

                    <h1 className="statement  text-2xl text-white">Who We Are</h1>
                    <p className=" max-w-2xl mx-auto  ">We are the data controller responsible for personal data collected through this website.If you have any questions about this policy or how your data is handled, you can contact us using the details provided in the Complaints section.</p>

                    <h1 className="statement  text-2xl text-white">What Data We Collect</h1>
                    <p className=" max-w-2xl mx-auto  ">We may collect the following personal data:</p>
                    <ul style={{ listStyleType: 'disc' }}>
                        <li>Name</li>
                        <li>Email address</li>
                        <li>Billing and payment information</li>
                        <li>Purchase history</li>
                        <li>Technical data such as IP address, browser type, and device information</li>
                    </ul>

                    <h1 className="statement  text-2xl text-white">How We Collect Your Data</h1>
                    <p className=" max-w-2xl mx-auto  ">We collect data when you:</p>
                    <ul style={{ listStyleType: 'disc' }}>
                        <li>Sign up to receive content or downloads</li>
                        <li>Purchase a digital or physical product</li>
                        <li>Contact us directly</li>
                        <li>Use or browse the website (via cookies and similar technologies)</li>
                    </ul>

                    <h1 className="statement  text-2xl text-white">How We Use Your Data</h1>
                    <p className=" max-w-2xl mx-auto  ">We use personal data only where legally permitted, including:</p>
                    <ul style={{ listStyleType: 'disc' }}>
                        <li>Providing access to purchased digital content</li>
                        <li>Processing payments and delivering products</li>
                        <li>Sending transactional emails related to purchases</li>
                        <li>Responding to enquiries or support requests</li>
                        <li>Improvingwebsite performance and security</li>
                    </ul>
                    <p className=" max-w-2xl mx-auto  ">We do not sell or rent personal data to third parties.</p>

                    <h1 className="statement  text-2xl text-white">Legal Bases for Processing</h1>
                    <p className=" max-w-2xl mx-auto  "> We process personal data under the following lawful bases:</p>
                    <ul style={{ listStyleType: 'disc' }}>
                        <li>Contract –where processing is necessary to deliver purchased products</li>
                        <li>Consent –where explicit consent has been given</li>
                        <li>Legal obligation –where required by law</li>
                        <li>Legitimate interests –for website security and service improvement</li>
                    </ul>

                    <h1 className="statement  text-2xl text-white">Payments</h1>
                    <p className=" max-w-2xl mx-auto  ">Payments are processed securely by third-party payment providers. We do not store full payment card details on our servers.</p>

                    <h1 className="statement  text-2xl text-white">Data Sharing</h1>
                    <p className=" max-w-2xl mx-auto  ">We may share data with trusted third parties only where necessary to operate the site and deliver services. This may include:</p>
                    <ul style={{ listStyleType: 'disc' }}>
                        <li>Payment processors</li>
                        <li>Email delivery providers</li>
                        <li>Website hosting and infrastructure providers</li>
                    </ul>
                    <p className=" max-w-2xl mx-auto  ">All third parties are required to process data lawfully and securely.</p>

                    <h1 className="statement  text-2xl text-white">Data Retention</h1>
                    <p className=" max-w-2xl mx-auto  ">Personal data is retained only for as long as necessary to fulfil the purposes for which it was collected, including legal and accounting requirements.</p>

                    <h1 className="statement  text-2xl text-white">Your Rights</h1>
                    <p className=" max-w-2xl mx-auto  ">Under UK data protection law, users have the right to:</p>
                    <ul style={{ listStyleType: 'disc' }}>
                        <li>Access their personal data</li>
                        <li>Request correction of inaccurate datas</li>
                        <li>Request erasure of their data</li>
                        <li>Object to or restrict processing</li>
                        <li>Request data portability</li>
                    </ul>
                    <p className=" max-w-2xl mx-auto  ">Users also have the right to lodge a complaint with the UK Information Commissioner’s Office (ICO).</p>

                    <h1 className="statement  text-2xl text-white">Data Security</h1>
                    <p className=" max-w-2xl mx-auto  ">We take appropriate technical and organisational measures to protect personal data against loss, misuse, unauthorised access, or disclosure.</p>

                    <h1 className="statement  text-2xl text-white">Changes to This Policy</h1>
                    <p className=" max-w-2xl mx-auto  ">This Privacy Policy may be updated from time to time. Any changes will be posted on this page and take effect immediately.</p>


                </div>
            </section>

        </main>
    );
}

export default page;
