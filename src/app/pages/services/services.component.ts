import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

type ServiceStat = {
  value: string;
  label: string;
  detail: string;
};

type ServiceItem = {
  title: string;
  text: string;
};

type ServiceStep = {
  id: string;
  title: string;
  text: string;
};

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent {
  stats: ServiceStat[] = [
    {
      value: '9+',
      label: 'Service tracks',
      detail: 'From site investigations and factual reports through vibration review and remote monitoring.'
    },
    {
      value: '3',
      label: 'Condition survey layers',
      detail: 'Baseline review, post-activity documentation, and structural health assessment.'
    },
    {
      value: '24/7',
      label: 'Support continuity',
      detail: 'Monitoring workflows stay connected through commissioning, alerts, review, and handover.'
    }
  ];

  serviceStack: ServiceItem[] = [
    {
      title: 'Geotechnical investigations',
      text: 'Desk studies, ground type review, field testing, and factual reporting to define the right instrumentation plan.'
    },
    {
      title: 'Monitoring deployment',
      text: 'Installation planning, system integration, commissioning checks, and threshold setup for active sites.'
    },
    {
      title: 'Condition documentation',
      text: 'Building condition surveys, post-activity review packs, and clear structural health evidence for stakeholders.'
    },
    {
      title: 'Remote operations support',
      text: 'Real-time monitoring, vibration and noise review, analytics workflows, and long-term maintenance guidance.'
    }
  ];

  investigationServices: ServiceItem[] = [
    {
      title: 'Desk studies and geology review',
      text: 'Early-stage site context, ground type interpretation, and risk framing before hardware selection.'
    },
    {
      title: 'Standard penetration and field testing',
      text: 'Practical field inputs that support design assumptions, monitoring scope, and reporting requirements.'
    },
    {
      title: 'Factual and interpretation reports',
      text: 'Clear geotechnical reporting packages that help consultants, contractors, and owners align decisions.'
    },
    {
      title: 'Dewatering, vibration, and live-site planning',
      text: 'Support for dewatering schemes, noise and vibration checks, and temporary works monitoring strategy.'
    }
  ];

  conditionServices: ServiceItem[] = [
    {
      title: 'Baseline building condition survey',
      text: 'A starting record of visible condition before tunnelling, piling, demolition, or heavy construction begins.'
    },
    {
      title: 'Post-activity condition documentation',
      text: 'Targeted follow-up surveys that make change over time easier to review and explain.'
    },
    {
      title: 'Structural health assessment',
      text: 'A broader technical picture that connects measurement history, observed condition, and project risk.'
    }
  ];

  deliverySteps: ServiceStep[] = [
    {
      id: '01',
      title: 'Frame the risk',
      text: 'We review the site context, construction sequence, and reporting obligations before recommending a service scope.'
    },
    {
      id: '02',
      title: 'Plan the fieldwork',
      text: 'Survey tasks, instrumentation packages, access needs, and installation sequencing are mapped to the live programme.'
    },
    {
      id: '03',
      title: 'Commission with evidence',
      text: 'Readings, thresholds, dashboards, and review points are checked so teams can trust the first live data set.'
    },
    {
      id: '04',
      title: 'Support the lifecycle',
      text: 'Ongoing monitoring, interpretation support, and handover guidance keep the workflow useful after deployment.'
    }
  ];

  sectors: string[] = [
    'Metro and tunnel projects',
    'Rail corridors and stations',
    'Dams and water-retaining assets',
    'Deep excavation and piling works',
    'Buildings near high-risk activity',
    'Long-term infrastructure monitoring'
  ];
}
