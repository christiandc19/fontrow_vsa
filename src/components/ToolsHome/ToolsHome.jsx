import React from "react";
import { Link } from "react-router-dom";
import "./ToolsHome.css";

export default function ToolsHome() {
  return (
    <main className="tools-home">
      <section className="tools-home-left">
        <div className="tools-home-overlay" />

        <div className="tools-home-content">
          <img
            src="/images/clients/robin-run/robin-run-logo.webp"
            alt="WebSmartAssistant"
            className="tools-home-logo"
          />

          <h1>Is it time to get help?</h1>

          <p>
            Learn more about senior living options and which next step may be
            the best fit.
          </p>

          <Link
            to="/assessments/robin-run/care-needs"
            className="tools-home-button"
          >
            Take the Survey
          </Link>
        </div>
      </section>

      <section className="tools-home-right">
        <div className="tools-home-info">
          <p className="tools-home-kicker">
            Know more and be better prepared in <strong>about 4 minutes</strong>
          </p>

          <div className="tools-home-feature">
            <span>◎</span>
            <div>
              <h3>The Right Care</h3>
              <p>Find the best balance of safety, independence, and support.</p>
            </div>
          </div>

          <div className="tools-home-feature">
            <span>◷</span>
            <div>
              <h3>At the Right Time</h3>
              <p>Get help immediately or plan confidently for the future.</p>
            </div>
          </div>

          <div className="tools-home-feature">
            <span>⇄</span>
            <div>
              <h3>In the Right Place</h3>
              <p>Decide if staying home or senior living is the better fit.</p>
            </div>
          </div>

          <div className="tools-home-feature">
            <span>♢</span>
            <div>
              <h3>With the Right Support</h3>
              <p>Learn how to talk with family and explore next steps.</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="tools-home-footer">
        <span>🔒 Private and Secure</span>
        <span>Powered by WebSmartAssistant</span>
      </footer>
    </main>
  );
}