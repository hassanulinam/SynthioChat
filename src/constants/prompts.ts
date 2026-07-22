export type AudienceRole =
  | 'field'
  | 'medicalAffairs'
  | 'patientSupport'
  | 'commercial'

export type PromptKind = 'chat' | 'audio'

export interface RoleOption {
  id: AudienceRole
  label: string
}

export interface StarterPrompt {
  id: string
  title: string
  prompt: string
  kind: PromptKind
}

export interface FollowUpPrompt {
  id: string
  label: string
  prompt: string
}

export const AUDIENCE_ROLES: RoleOption[] = [
  { id: 'field', label: 'Field' },
  { id: 'medicalAffairs', label: 'Medical Affairs' },
  { id: 'patientSupport', label: 'Patient Support' },
  { id: 'commercial', label: 'Commercial' },
]

export const EMPTY_STATE_GREETING = {
  title: 'SynthioChat',
  description:
    'Your life-sciences engagement assistant. Ask about HCP talking points, patient-support scripts, field prep, or on-label summaries.',
}

export const COMPOSER_PLACEHOLDER =
  'Ask about HCP prep, evidence, or patient support…'

export const DEMO_COMPLIANCE_DISCLAIMER =
  'Demo responses — not approved promotional content / not medical advice'

export const STARTER_PROMPTS: Record<AudienceRole, StarterPrompt[]> = {
  field: [
    {
      id: 'field-visit-prep',
      title: 'HCP visit prep',
      prompt:
        'Prep me for an HCP visit on a specialty therapy. Include objectives, 3 key messages, likely objections, and suggested next steps.',
      kind: 'chat',
    },
    {
      id: 'field-objection',
      title: 'Objection handling',
      prompt:
        'Draft compliant objection handling for: “I already use the standard of care and do not see incremental benefit.” Keep it science-first and concise.',
      kind: 'chat',
    },
    {
      id: 'field-opener',
      title: '60s opener',
      prompt:
        'Write a 60-second HCP opener that sets context, states the clinical need, and invites discussion without overclaiming.',
      kind: 'chat',
    },
    {
      id: 'field-audio',
      title: 'Practice with Audio chat',
      prompt: 'Practice a short HCP visit opener out loud.',
      kind: 'audio',
    },
  ],
  medicalAffairs: [
    {
      id: 'ma-evidence',
      title: 'Evidence summary',
      prompt:
        'Summarize key evidence for this indication in bullets. Separate efficacy, safety, and practical considerations. Flag assumptions clearly.',
      kind: 'chat',
    },
    {
      id: 'ma-faq',
      title: 'MLR-safe FAQ',
      prompt:
        'Draft MLR-safe FAQ answers an MSL could use with HCPs. Keep claims conservative and note where label/PI confirmation is required.',
      kind: 'chat',
    },
    {
      id: 'ma-compare',
      title: 'Guideline framing',
      prompt:
        'Explain how to frame guideline-aligned discussion points with an HCP without sounding promotional.',
      kind: 'chat',
    },
    {
      id: 'ma-audio',
      title: 'Practice with Audio chat',
      prompt: 'Practice answering a scientific HCP question out loud.',
      kind: 'audio',
    },
  ],
  patientSupport: [
    {
      id: 'ps-titration',
      title: 'Titration in plain language',
      prompt:
        'Explain titration steps in plain, supportive language a patient can follow. Keep it calm, clear, and non-alarming.',
      kind: 'chat',
    },
    {
      id: 'ps-adherence',
      title: 'Adherence follow-up',
      prompt:
        'Write a supportive adherence follow-up script for a patient support call, including empathy openers and clear next actions.',
      kind: 'chat',
    },
    {
      id: 'ps-side-effects',
      title: 'Side-effect guidance',
      prompt:
        'Draft patient-friendly guidance for common side effects and when to contact their care team. Avoid diagnosing or changing treatment advice.',
      kind: 'chat',
    },
    {
      id: 'ps-audio',
      title: 'Practice with Audio chat',
      prompt: 'Practice a patient-support welcome call out loud.',
      kind: 'audio',
    },
  ],
  commercial: [
    {
      id: 'comm-channels',
      title: 'Engagement channels',
      prompt:
        'Compare engagement channels for specialty HCPs (field, email, congress, peer programs). Note compliance considerations for each.',
      kind: 'chat',
    },
    {
      id: 'comm-nurture',
      title: 'Nurture sequence',
      prompt:
        'Outline a compliant nurture sequence for HCPs exploring a new therapy area. Keep messaging educational and on-label oriented.',
      kind: 'chat',
    },
    {
      id: 'comm-brief',
      title: 'Campaign brief',
      prompt:
        'Draft a short campaign brief for HCP education: audience, objective, key messages, success metrics, and risk notes.',
      kind: 'chat',
    },
    {
      id: 'comm-audio',
      title: 'Practice with Audio chat',
      prompt: 'Practice pitching an HCP education program out loud.',
      kind: 'audio',
    },
  ],
}

export const FOLLOW_UP_PROMPTS: FollowUpPrompt[] = [
  {
    id: 'shorter',
    label: 'Make shorter',
    prompt:
      'Make the previous answer shorter. Keep the most important points and any safety caveats.',
  },
  {
    id: 'safety',
    label: 'Add safety caveats',
    prompt:
      'Revise the previous answer to add clearer safety caveats and on-label framing. Avoid promotional language.',
  },
  {
    id: 'hcp-roleplay',
    label: 'Role-play as HCP',
    prompt:
      'Role-play as a skeptical HCP responding to the previous answer. Ask 3 tough but realistic questions.',
  },
  {
    id: 'patient-friendly',
    label: 'Make patient-friendly',
    prompt:
      'Rewrite the previous answer in plain, patient-friendly language. Keep it supportive and avoid clinical jargon where possible.',
  },
]

export function isAudienceRole(value: unknown): value is AudienceRole {
  return (
    value === 'field' ||
    value === 'medicalAffairs' ||
    value === 'patientSupport' ||
    value === 'commercial'
  )
}

export function getStarterPrompts(role: AudienceRole): StarterPrompt[] {
  return STARTER_PROMPTS[role]
}
