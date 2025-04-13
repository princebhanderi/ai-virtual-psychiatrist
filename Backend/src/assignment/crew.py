from crewai import Agent, Crew, Process, Task
from crewai.project import CrewBase, agent, crew, task

class ConversationMemory:
    history = []

    @staticmethod
    def update_memory(user_input, response):
        ConversationMemory.history.append({'user': user_input, 'bot': response})

    @staticmethod
    def get_context():
        return " ".join([f"User: {entry['user']} | Bot: {entry['bot']}" for entry in ConversationMemory.history[-5:]])

@CrewBase
class Assignment():
    """Interactive Student Psychiatry Chatbot"""

    agents_config = 'config/agents.yaml'
    tasks_config = 'config/tasks.yaml'

    @agent
    def psychiatrist(self) -> Agent:
        return Agent(
            config=self.agents_config['psychiatrist'],
            verbose=True
        )

    @agent
    def counselor(self) -> Agent:
        return Agent(
            config=self.agents_config['counselor'],
            verbose=True
        )

    @agent
    def wellness_coach(self) -> Agent:
        return Agent(
            config=self.agents_config['wellness_coach'],
            verbose=True
        )

    @task
    def assess_and_respond(self) -> Task:
        return Task(
            config=self.tasks_config['assess_and_respond'],
            agent=self.psychiatrist(),  # Primary agent
            function=self._collaborative_response
        )

    def _collaborative_response(self, context: str, student_issue: str, emotion: str) -> str:
        # Get inputs from all agents
        agents = {
            'psychiatrist': self.psychiatrist(),
            'counselor': self.counselor(),
            'wellness_coach': self.wellness_coach()
        }

        inputs = {}
        for role, agent in agents.items():
            inputs[role] = agent.execute_task(
                task=Task(
                    description=f"Provide your 1-line {role} perspective on: {student_issue}",
                    expected_output=f"1-line {role} input"
                ),
                context=context
            )

        # Combine inputs with emotion-appropriate tone
        tone = self._get_tone(emotion)
        combined = (
            f"{tone} From a clinical perspective: {inputs['psychiatrist']} "
            f"Try this strategy: {inputs['counselor']} "
            f"And consider: {inputs['wellness_coach']}"
        )

        # Refine to 3-4 lines
        return self._condense_response(combined)

    def _get_tone(self, emotion: str) -> str:
        tones = {
            'sad': "I understand this is really hard for you",
            'anxious': "I hear how overwhelming this feels",
            'confused': "Let me help break this down",
            'neutral': "I understand what you're sharing"
        }
        return tones.get(emotion.lower(), "I appreciate you sharing this")

    def _condense_response(self, text: str) -> str:
        # Simple logic to ensure 3-4 lines
        sentences = [s.strip() for s in text.split('.') if s.strip()]
        return '. '.join(sentences[:3]) + '.' if len(sentences) >= 3 else text

    @crew
    def crew(self) -> Crew:
        """Creates the Student Psychiatry Chatbot crew"""
        return Crew(
            agents=self.agents,
            tasks=[self.assess_and_respond()],
            process=Process.sequential,
            verbose=False
        )