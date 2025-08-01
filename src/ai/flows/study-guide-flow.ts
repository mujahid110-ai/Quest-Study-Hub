
'use server';
/**
 * @fileOverview An AI flow to generate study guides.
 *
 * - generateStudyGuide - A function that creates a study guide for a given topic.
 * - StudyGuideInput - The input type for the generateStudyGuide function.
 * - StudyGuide - The return type for the generateStudyGuide function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const StudyGuideInputSchema = z.object({
  topic: z.string().describe('The academic topic for the study guide.'),
});
export type StudyGuideInput = z.infer<typeof StudyGuideInputSchema>;

const StudyGuideSchema = z.object({
  topic: z.string().describe('The topic of the study guide.'),
  keyConcepts: z
    .array(z.string())
    .describe('A list of the most important concepts or terms related to the topic.'),
  summary: z
    .string()
    .describe('A concise summary of the topic, explaining the key concepts.'),
  practiceQuestions: z
    .array(z.string())
    .describe('A list of 3-5 practice questions to test understanding of the topic.'),
});
export type StudyGuide = z.infer<typeof StudyGuideSchema>;

const studyGuidePrompt = ai.definePrompt({
  name: 'studyGuidePrompt',
  input: { schema: StudyGuideInputSchema },
  output: { schema: StudyGuideSchema },
  prompt: `
    You are an expert educator and academic assistant.
    Your task is to generate a helpful study guide for a student on a specific topic.

    The study guide must include:
    1.  A list of key concepts or vocabulary.
    2.  A clear and concise summary that explains the topic and its key concepts.
    3.  A set of 3 to 5 practice questions that will help the student test their knowledge.

    The tone should be encouraging and straightforward.

    Topic: {{{topic}}}
  `,
});

const studyGuideFlow = ai.defineFlow(
  {
    name: 'studyGuideFlow',
    inputSchema: StudyGuideInputSchema,
    outputSchema: StudyGuideSchema,
  },
  async (input) => {
    const { output } = await studyGuidePrompt(input);
    return output!;
  }
);

export async function generateStudyGuide(input: StudyGuideInput): Promise<StudyGuide> {
    return studyGuideFlow(input);
}
