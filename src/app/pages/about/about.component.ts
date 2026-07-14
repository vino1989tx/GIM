import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

type AboutStat = {
  value: string;
  label: string;
  detail: string;
};

type ValuePillar = {
  title: string;
  text: string;
};

type DeliveryStep = {
  id: string;
  title: string;
  text: string;
};

type Strength = {
  title: string;
  text: string;
};

type Office = {
  label: string;
  city: string;
  text: string;
};

type HeroSignal = {
  label: string;
  title: string;
  text: string;
};

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  stats: AboutStat[] = [
    {
      value: '24/7',
      label: 'Data visibility',
      detail: 'Remote monitoring workflows built for live project awareness.'
    },
    {
      value: '6',
      label: 'Product families',
      detail: 'Instrumentation coverage across movement, load, vibration, and connectivity.'
    },
    {
      value: '3',
      label: 'Regional bases',
      detail: 'Project support spanning India, the Middle East, and Southeast Asia.'
    }
  ];

  valuePillars: ValuePillar[] = [
    {
      title: 'Precision',
      text: 'Measurement quality you can trust through specification, commissioning, and long-term operation.'
    },
    {
      title: 'Integrity',
      text: 'Clear communication, practical advice, and transparent reporting at every stage of delivery.'
    },
    {
      title: 'Innovation',
      text: 'Continuous improvement in instrumentation, connectivity, and cloud-enabled decision support.'
    },
    {
      title: 'Service',
      text: 'Responsive support that stays engaged well after installation and handover.'
    }
  ];

  deliverySteps: DeliveryStep[] = [
    {
      id: '01',
      title: 'Scope the risk',
      text: 'We review project conditions, monitoring objectives, and reporting expectations before equipment is selected.'
    },
    {
      id: '02',
      title: 'Configure the stack',
      text: 'Sensors, gateways, and dashboards are matched into a deployment that fits the site and the contract.'
    },
    {
      id: '03',
      title: 'Commission with confidence',
      text: 'Installation guidance, threshold setup, and validation checks ensure the system is ready for decision-making.'
    },
    {
      id: '04',
      title: 'Support the lifecycle',
      text: 'Operations teams receive training, diagnostics support, and a clear path for ongoing reporting and maintenance.'
    }
  ];

  strengths: Strength[] = [
    {
      title: 'Engineering-grade hardware',
      text: 'Designed for harsh environments with durable housings, dependable electronics, and project-ready protection.'
    },
    {
      title: 'Integrated remote monitoring',
      text: 'From field sensors to dashboards, we connect acquisition, transmission, alerting, and review in one workflow.'
    },
    {
      title: 'Project-first support',
      text: 'Our team helps with site surveys, system integration, commissioning, and practical handover to operations teams.'
    }
  ];

  offices: Office[] = [
    {
      label: 'Head Office',
      city: 'Mumbai, India',
      text: 'Key account management, product design, engineering coordination, and research-led development.'
    },
    {
      label: 'Regional Support',
      city: 'Dubai, UAE',
      text: 'Middle East operations, field service planning, and responsive support for live project deployments.'
    },
    {
      label: 'Technical Services',
      city: 'Singapore',
      text: 'Project engineering, monitoring analytics, and delivery support for regional infrastructure programs.'
    }
  ];

  heroSignals: HeroSignal[] = [
    {
      label: 'Field to cloud',
      title: 'Integrated monitoring stack',
      text: 'Sensors, gateways, dashboards, and alert workflows are shaped into one deployment model.'
    },
    {
      label: 'Project fit',
      title: 'Risk-led system design',
      text: 'Instrumentation is selected around site conditions, reporting expectations, and decision timelines.'
    },
    {
      label: 'Support model',
      title: 'Lifecycle partnership',
      text: 'Commissioning, training, diagnostics, and long-term review stay connected after handover.'
    }
  ];
}
