import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { essays } from '@/lib/content'
import { Tag, Callout } from '@/components/ui'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return essays.map((e) => ({ slug: e.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const essay = essays.find((e) => e.slug === slug)
  if (!essay) return {}
  return {
    title: essay.title,
    description: essay.summary,
  }
}

// Full essay content per slug
const essayContent: Record<string, string> = {
  'are-there-truths-you-should-not-assert': `
## The Point of Assertion

It can seem initially attractive that truth licenses assertion. If the purpose of assertion is to convey accurate information then simple logic dictates that it is natural to think that any true proposition is assertible. Yet this underestimates the extent to which an assertion is a normative social practice rather than a semantic one. Assertions are not simply stating truths but presenting them as something that can be digested by specific audiences from a particular epistemic position.

This suggests an initial constraint on an assertion. Where a speaker who asserts a true proposition while lacking any sound epistemic basis will misrepresent their position as someone who understands the assertion. Even if the audience acquires a true belief, there has been error in the act of the assertion itself. This raises doubt on the notion that truth alone can justify assertions.

## Epistemic Responsibility

As Weiner observes, asserting a proposition usually represents the speaker as being entitled to it in some epistemic way (Weiner, 2007). This explains why lucky guesses, even when true, are not set for assertion — the problem is not the truth of what is said, but rather the disparity between the assertion and the speaker's epistemic position. Assertion therefore functions as an epistemic guarantee to some audience and where that guarantee is unwarranted, the assertion is non-functional even if it is true.

However, epistemic entitlement alone cannot fully account for when truths ought not to be asserted. There are some instances where the speaker knows that a proposition is true, yet asserting it still seems inappropriate. This implies that epistemic responsibility is mono-dimensional regarding the norms which govern assertion. To further explain these specific instances we must examine how assertions operate inside different contexts.

## Misleading Truths

Grice provides an account of conversational implicature which offers reasoning for how a true assertion can nonetheless be objectionable. As per Grice, "cooperative conversation" is governed by maxims such as Quantity and Relation, which lead hearers to infer more than what is strictly said (Grice, 1989). As audiences reasonably assume that speakers are being somewhat informative and relevant, speakers can create misleading implications without asserting anything explicitly false. As Blome-Tillmann writes, this makes it possible to deceive while speaking the truth (Blome-Tillmann, 2013).

A speaker may assert a proposition that is true but incomplete, assuming that the audience will draw a false conclusion. What makes such a case problematic is not simply that a conversational norm has been violated but that the speaker knowingly relies on the audience's cooperation to infer error. These instances show that there are truths that one should not assert because of the pragmatic consequences of asserting them. Even when a speaker knows the proposition and asserts it with full sincerity, the effect of the assertion is still to mislead. This shows that assertability depends not only on truth and knowledge but additionally on the communicative role that an assertion carries in context.

## Conditionality of Assertions

Assertions are not simply a conduit for transmitting true propositions but are interventions in an epistemic context. As such, speakers carry responsibility not only for what they say, but for how their words are taken by others. This suggests that a speaker should not assert a proposition, even if it is true and known, when they can reasonably foresee that asserting it will lead their audience to form a false belief.

This explains why lucky guesses are not permissible for assertions, and why misleading truths are problematic, and why certain context-reliant truths should not be asserted despite being known.

## Morals of Truthful Assertion

The moral significance of such a failure is emphasised by Saul and Stokke. Saul argues that restricting moral evaluation to lying overlooks a wide range of deceptive speech acts that operate through true assertions (Saul, 2012). If a speaker knowingly induces a false belief by asserting a truth, then the fact that no false statement was made does not absolve them of responsibility. From the audience's perspective, the epistemic harm is the same.

Stokke similarly distinguishes lying from misleading whilst still maintaining that misleading can be morally objectionable even when it involves no falsehoods (Stokke, 2013). This supports the aforementioned conditionality by showing that speakers are accountable for the predictable effects of their assertions, not simply for their semantic content. The "wrongness" of such assertions lies not in their falsity, nor necessarily in the speaker's lack of knowledge, but rather in the mismanagement of shared epistemic norms.

## Conclusion

The question of whether there are truths that one should not assert seems simple once assertion is understood as a norm-governed social practice. Whilst truth is a necessary condition for proper assertion, it is not sufficient. Assertions represent speakers as epistemically entitled and shape the epistemic environment of their audience. When asserting a truth would misrepresent one's epistemic position or foreseeably mislead an audience, that truth ought not to be asserted. The main notion then is that assertability depends not only on what is true, but on how truth is responsibly communicated. Therefore there are indeed some truths that one should not assert.

## Bibliography

Blome-Tillmann, M. (2013). "Conversational Implicatures (and How to Spot Them)." *Philosophy Compass* 8(2): 170–185.

Grice, H. P. (1989). *Studies in the Way of Words*. Cambridge, MA: Harvard University Press.

Saul, J. (2012). "Just Go Ahead and Lie." *Analysis* 72(1): 3–10.

Stokke, A. (2013). "Lying, Deceiving, and Misleading." *Philosophy Compass* 8(4): 348–359.

Weiner, M. (2007). "Norms of Assertion." *Philosophy Compass* 2(2): 187–195.
`,

  'foot-killing-and-letting-die': `
## Introduction

Whether there is a morally significant difference between killing and letting die is contentious. The consequentialist approaches this by rejecting this distinction, arguing that only outcomes ultimately matter — a thoroughly utilitarian point of view. Philippa Foot challenges this view by arguing that there is a morally significant distinction between doing harm and merely letting it occur. By Foot, those who deny the existence of this distinction fail to recognise the asymmetry between the duty not to harm and the duty to provide aid.

I argue that Foot successfully identifies this moral distinction as a feature of moral agency — where initiating harm typically holds greater moral weight than failing to prevent it — while also recognising that Foot ultimately fails to represent this distinction as a decisive principle.

## Doing Harm vs. Allowing Harm

Foot's argument observes that moral practices treat distinct kinds of actions as more serious than others, even when outcomes are identical. Killing someone would typically be viewed as morally worse than simply allowing them to die. According to Foot, killing involves initiating a harmful causal chain of events, whereas letting someone die consists in permitting such a process to continue (Foot, 2002). The difference elucidates on the asymmetry between negative and positive duties. Negative duties prevent us from harming others, whereas positive duties require us to provide aid. Foot says that negative duties are stronger. Thus, violating a negative duty is worse than failing to complete a positive duty.

This explains why certain moral intuitions are resistant to cut-and-dry consequentialist reasoning — as in the transplant case, wherein a doctor could kill a healthy patient and distribute their organs to save five others. Even if doing this would maximise the overall lives saved, most people would regard the action as morally impermissible. Foot's framework explains that killing the patient violates the negative duty not to harm.

## Rejections from Consequentialism

Consequentialists would reject the claim that this distinction exists. On consequentialist views, actions should be evaluated solely on the value of their outcomes. Thus, if killing one person would prevent several deaths, then the killing may appear morally justified. The contention between both perspectives is even more evident in trolley-problem style cases. Thomson's analysis highlights the difficulty of explaining why diverting a trolley onto a track where it kills one person is permissible, whilst pushing someone onto the track to stop the trolley killing five people seems impermissible (Thomson, 1976). These cases suggest that differences in agency — doing versus allowing harm — can shape moral judgement independently of consequences.

Foot's theory captures this feature of moral reasoning by emphasising the difference between initiating and permitting harm, explaining why some actions remain prohibited even when they would produce better outcomes.

## Responsibility and Limits

Despite the distinction's appeal, it also faces challenges. Kagan argues that drawing a decisive moral boundary between doing and allowing harm can obscure the morally relevant similarities between actions (Kagan, 1989). A moral agent may deliberately structure their behaviour so that a harmful outcome occurs without directly inciting the chain of harm. If the agent knowingly allows a preventable harm to occur when intervention would be easy, the moral difference between active harm and their behaviour seems lesser.

Quinn also argues that the moral importance of doing versus allowing depends heavily on intention rather than on the physical form of the action itself (Quinn, 1989). Certain cases can blur the boundary because agents can manipulate the causal structures of the action to avoid direct responsibility whilst still bringing about the harmful consequences.

## Moral Agency

Further challenges arise when we consider indirect harm. McMahan argues that removing barriers to harm — such as withdrawing life-sustaining aid — can sometimes count as killing rather than allowing one to die (McMahan, 1993). If withdrawing this aid initiates a new causal chain which leads to death, the classification becomes unclear. The distinction between doing and allowing therefore often depends on how these causal processes are described. However, moral evaluation cannot depend on subtle discrepancies in cause alone. If two actions have the same moral outcome through similar causes, treating them as morally distinct is arbitrary.

## Foot's Insights

Despite these criticisms, Foot's central tenet remains persuasive. There is a distinction between killing and letting die which demonstrates that actively initiating harm carries greater moral weight than failing to prevent it. This helps explain why certain consequentialist conclusions seem impermissible. By emphasising the moral significance of agency, Foot provides an account of why actively causing harm violates stronger moral boundaries than allowing harm to occur.

## Conclusion

Foot succeeds in demonstrating that there is a distinction between killing and letting die which relies on the moral aspect of agency. However, the distinction is not universal enough to stand as a decisive moral principle. Cases involving responsibility for actions can be ambiguous — some killings can seem to have the same moral weight as simply letting die — and therefore we cannot draw this distinction as an absolute.

## Bibliography

Foot, P. (2002). *Moral Dilemmas and Other Topics in Moral Philosophy*. Oxford: Oxford University Press.

Kagan, S. (1989). *The Limits of Morality*. Oxford: Oxford University Press.

McMahan, J. (1993). "Killing, Letting Die, and Withdrawing Aid." *Ethics* 103(2).

Quinn, W. (1989). "Actions, Intentions, and Consequences: The Doctrine of Doing and Allowing." *The Philosophical Review* 98(3).

Thomson, J. J. (1976). "Killing, Letting Die, and the Trolley Problem." *The Monist*.
`,

  'do-colours-exist': `
## Introduction

The question of whether colours exist concerns the metaphysical status of perceptible qualities: whether colour is a mind-independent feature of the world or a mind-dependent one that arises only through interactions with perceivers. Although ordinary experience treats colours as straightforward properties of objects, this assumption can be challenged.

I examine three major theories of colour: naïve realism, which holds that colours are mind-independent, intrinsic properties of external objects; eliminativism, which denies the existence of colour altogether; and dispositionalism, which argues that colours are real, but constituted by the powers of objects to produce specific experiences in perceivers. I argue that dispositionalism offers the most plausible theory, as it preserves the reality of colour whilst explaining the systematic dependence of colour perception on viewing conditions.

## Naïve Realism

Naïve realism — or primitivism — maintains that colours are genuine, mind-independent properties of physical objects. On this view, when one perceives an apple as red, one directly perceives a feature that exists in the world, regardless of whether other observers experience it. This view seems attractive because we ordinarily treat colours as surface features, much like shape or size.

However, this breaks down when we examine how colour perception varies across contexts. Colour appearance changes with lighting — an object that looks red in daylight may appear darker, washed out, or even a different hue under other lighting conditions. If colour were a fixed, intrinsic property of the object, such variation would be hard to accommodate. Furthermore, varied species perceive wavelengths differently. This undermines the idea that there is a non-arbitrary way of "correctly" seeing colour.

## Objections to Naïve Realism

If this analysis is correct, colour cannot be a mind-independent quality of matter like solidity or shape. Instead, it depends on the perceptual capacities of observers and the conditions under which perception occurs. This challenges naïve realism, since colour experience results from the interaction between light, object, and perceiver rather than any intrinsic property of the object. Moreover, the systematic variation in colour appearance means the realist cannot simply privilege one "correct" viewing condition without justification.

## Eliminativism

Eliminativism denies that colours are genuine properties of physical objects and instead proposes that colours are simple appearances generated by observers' perceptual faculties. This is rooted in early philosophy, notably in the work of Galileo. He argued that if "tastes, odours, colours and so on… reside in consciousness," and that if all living creatures were removed, such qualities "would be wiped away and annihilated" (Galilei, 2016). Colours, by contrast, arise only within the mind of the perceiver. Locke later developed this distinction through his theory of primary and secondary qualities, suggesting that colour is produced in us by the interaction of an object's primary qualities with our senses.

## Objections to Eliminativism

Eliminativism faces a major objection: if colours are illusions, then ordinary perception would be systematically deceptive, and everyday observation would fail to represent the world accurately. This scepticism undermines confidence not only in colour but also in sensory reliability itself. This view is rendered unattractive, acceptable only if no alternative can explain the apparent reality of colour.

## Dispositionalism

Dispositionalism offers a middle-ground between naïve realism and eliminativism. While it agrees that colour perception is mind-dependent, it rejects the conclusion that colours are therefore unreal. Instead, it treats colours as "dispositions" or "powers" of physical objects to produce certain experiences in suitably placed observers. To say an object is "red" is to say it has the capacity to generate red-type sensations under normal conditions.

This view has strong grounding in Locke's *An Essay Concerning Human Understanding*. Locke argues that primary qualities — such as solidity or extension — exist in objects themselves and resemble what we perceive. Secondary qualities like colour, by contrast, do not resemble anything intrinsic to the object but are powers to produce sensations in observers (Locke, 1690/1975). Thus, colour does not disappear from the world but remains an efficacious, relational feature of physical matter.

## A Critical Argument Against Dispositionalism

Despite the appeal of dispositionalism, there also exists the circularity objection. It is argued that the theory defines colour in tautological terms — to say an object is red because it is disposed to cause red sensations seems uninformative unless we already understand what a red sensation is. This suggests that dispositionalism is trivial, where colours are perceptual rather than objective, and raises the concern that it collapses into a form of subjectivism.

However, this can be challenged. Locke suggests that secondary qualities depend on "the constitution of bodies" that cause sensations in us, not on arbitrary standards regarding perception. Furthermore, while dispositionalism may appear circular, this can be avoided if "normal conditions" are defined empirically rather than conceptually (Logue, 2016). We can define "normal observers" as observers with functional visual faculties under standard illumination, without any presupposition about what a "correct" colour experience is.

My view is that the circularity objection gains validity only if we demand a reductive analysis of colour that excludes perceptual experience. Dispositionalism is better understood as a relational theory. If colour is inherently a relation between object and perceiver, referencing experience is a feature rather than a flaw.

## Conclusion

The question of whether colours exist exposes a tension between appearance and interpretation. Naïve realism is intuitive but fails to explain perceptual variation, while eliminativism offers a scientific account yet undermines sensory reliability. Dispositionalism provides a balanced view: colours are powers of objects to evoke sensations, preserving their reality while acknowledging dependence on perception. Colour is neither fixed nor illusory but a relational feature linking the mind and world.

## Bibliography

Galilei, G. (2016). *The Assayer*. In *The Controversy on the Comets of 1618*. Philadelphia: University of Pennsylvania Press.

Locke, J. (1690/1975). *An Essay Concerning Humane Understanding*. Oxford: Clarendon Press.

Logue, H. (2016). "Metaphysics of Color 2: Non-Physicalist Theories of Color." *Philosophy Compass* 11(4): 220–231.
`,

  'corruption-and-republican-thought': `
## Introduction

Republicanism is a political ideology based on the idea of freedom derived from non-domination. Non-domination refers to the concept of promoting equality without being dominated by another political entity or agent. Corruption, in the republican sense, is defined as the deterioration of civic virtue which leads to citizens and institutions turning away from the common good and towards private interest.

We can separate the broad term "corruption" into two forms: civic corruption, where citizens become apathetic and lose their commitment to the common good; and institutional corruption, where public power is captured by elites. I argue that corruption is central to republican thought because it directly threatens freedom as non-domination, undermines civic virtue, and enables elite capture of the state and its institutions.

## Freedom and Corruption in Republicanism

Republican freedom can be defined as freedom from arbitrary power, and not just from non-interference. Freedom only exists when citizens abide by laws that they collectively control, rather than being at the crux of another's will (Pettit, 1999). Therefore, we can determine that liberty depends on institutions — to prevent domination — as well as on civic virtue in order to maintain collective responsibility. Corruption therefore proposes a significant threat to freedom by eroding civic virtue and thereby allowing private interests to capture public power, concentrating it in the elites. This effectively converts self-governance into domination by the state.

Machiavelli — a central thinker in republican thought — argues that republics remain free when citizens can maintain their *virtù*, defined as the active commitment to the common good that resists decay (Machiavelli, 2003). In addition, corruption leads to dependence, making people rely on the favour of the elite rather than the rule of law. This directly conflicts with the definition of republican freedom. So corruption is not simply defined as immoral, but is a structural problem — it breaks down the institutions that protect citizens from arbitrary power.

## Rousseau and Marx

Both Rousseau and Marx define corruption as destroying the collective freedom upon which republics depend, however they differ in their accounts of its roots.

Rousseau suggests that corruption arises when private interests outweigh the common good, making citizens dependent and losing their autonomy. Rousseau posits that social inequality makes individuals reliant on wealth rather than civic virtue (Rousseau, 2010). The "general will" — the shared will of citizens focused on the common good — collapses once elites manipulate institutions to protect their own privilege. A corrupt society cannot experience general will at all. Rousseau's view is therefore pessimistic: once corruption occurs, it gives way to a concentration of power with little chance of recovery.

Marx, by contrast, understands corruption in structural rather than moral terms. He suggests that domination is native to capitalism — that the state reflects bourgeois interests, so political institutions are already corrupted by economic inequality prior to any individual act of corruption (Leipold, 2020). Republican freedom in this sense reveals an actual, hidden, deep dependence: workers are never truly free because the entire economy is built on a hierarchy.

## Corruption as a Central Problem

Republican thinkers consider corruption a central problem because it undermines civic virtue, which is essential to keep a republic alive. For a free community to function, citizens must see themselves as part of a community — individuals should prioritise the common good rather than private interests. Institutions also play a part: they only function properly when citizens truly believe in the common good and act to protect it.

To critically evaluate, we can see the limits of republican theory. The emphasis on civic virtue demonstrates something important about how power decays from within, even when institutions appear stable. However, this also carries the risk of sounding naïve regarding the economic and social pressures that lead citizens to prioritise self-interest in the first place. A republic cannot solely rely on civic virtue — it requires fair structures that mitigate the inequality which inevitably leads to corruption.

Furthermore, it can be argued that corruption is overstated, since modern states can often function in spite of ever-present corruption. However the republican argument would reply that corruption is what allows every other threat to grow — symbiotically exacerbating every other possible problem. Hence why corruption is not just another problem, but the central problem which challenges the primary ideal of republicanism: freedom.

## Conclusion

Corruption is central to republican thought as it elucidates how fragile the concept of freedom really is. For republicans, liberty is not guaranteed by laws alone, but is dependent on the active participation of the people to preserve the common good. When civic commitment deteriorates, institutions lose their purpose, inciting domination. From Machiavelli's fears of decaying *virtù*, to Rousseau and Marx's critiques of concentration of class power, corruption is exemplified when citizens stop ruling themselves and become ruled — or dominated — by others.

## Bibliography

Leipold, B. (2020). "Marx's Social Republic: Radical Republicanism and the Political Institutions of Socialism." In Leipold, B., Nabulsi, K. and White, S. (eds.) *Radical Republicanism*. Oxford University Press.

Machiavelli, N. (2003). *Discourses on Livy*. New York: OUP Oxford.

Pettit, P. (1999). "Liberty as Non-Domination." In *Republicanism: A Theory of Freedom and Government*. Oxford University Press.

Rousseau, J.-J. (2010). *A Discourse on Inequality*. New York: Open Road Integrated Media.
`,

  'gandhi-non-violence': `
## Introduction

Gandhi's defence of non-violence is typically presented as reliant on two distinct tenets: an ethical commitment to moral unity, and a pragmatic assessment of how freedom can be effectively achieved under conditions of colonial domination. I shall argue that Gandhi's claim is partially justified — non-violence is ethically coherent and consistent within his broader critique of modern civilisation, and can be pragmatically effective under specific political conditions. However, its pragmatic force is limited by its reliance on specific structural factors that come with imperial rule, which restricts its applicability as a universal strategy of liberation.

By distinguishing clearly between ethical justifications and pragmatic effectiveness, we can see both the strengths and limitations of Gandhi's argument.

## Ethical Aspects of Gandhian Non-Violence

Ethically, Gandhi's commitment to non-violence originates in his view of freedom, which rejects domination not only as an external political factor, but also as a moral relationship between people. In *Hind Swaraj*, Gandhi argues that *swaraj* — true freedom — requires self-rule in both the collective and individual sense. Liberation cannot be achieved through any means that reproduce coercion and moral corruption (Gandhi, 2009). On this view, violence is ethically self-defeating as it induces instances of domination that are incompatible with self-rule.

This ethical position is connected to Gandhi's broader critiques of modern western civilisation. He rejects the assumption that political progress is measured by technological advancement or institutional efficiency, proposing instead that modernity encourages moral degradation and dependence (Gandhi, 2009). Non-violence therefore functions as a form of moral discipline that resists the dehumanising tendencies of modern politics.

Furthermore, Nandy observes that Gandhi's ethical rejection of violence is inseparable from his broader cultural critiques of the west, wherein violence is understood to be symptomatic of any civilisation that stakes power over moral self-restraint (Nandy, 1981). Gandhi does not claim that non-violence guarantees moral purity or political success outright — but maintains that violent resistance necessarily undermines all ethical foundations of the freedom it aims to secure.

## Non-Violence as a Pragmatic Political Strategy

Gandhi also presents non-violence as a pragmatic strategy for resisting colonial rule. He argues that non-violent resistance incites and mobilises mass participation, exposes the moral illegitimacy of imperial power, and degrades the authority of the coloniser without inciting excessive repression. Mantena characterises this approach as a form of "political realism," in which Gandhi recognises the structural asymmetries of imperial power and adapts political resistance accordingly (Mantena, 2012).

British colonial rule in India depended not only on coercive force, but also on claims of moral superiority and civilisational legitimacy. Non-violent resistance undermined these claims by forcing the colonial state to confront the contradiction between its own values and its oppressive practices. As Mantena argues, Gandhi's strategy aimed to transform political conflict into a moral confrontation that imperial authorities were structurally unable to win (Mantena, 2012).

In addition, non-violence enabled broad participation across social lines, reducing reliance on elite-led or militarised movements that risked reproducing new forms of domination after independence. In this sense, Gandhi's pragmatic argument is closely aligned with his ethical commitments: non-violence is not only morally preferable but politically advantageous insofar as it incites civic discipline and collective self-rule.

## Limitations of Gandhi's Pragmatic Claim

Despite its apparent strengths, Gandhi's pragmatic justification for non-violence faces significant limitations. Most notably, its effectiveness depends on specific characteristics of colonial power. Non-violent resistance assumes a coloniser at least partially susceptible to moral pressures and constrained by public opinion. This raises questions about whether Gandhi's strategy can be generalised beyond the context of British imperial rule.

Fanon highlights this limitation, arguing that colonial domination is fundamentally violent, and that non-violence carries the risk of reinforcing colonial hierarchies by leaving the structure of coercion and imperialism intact (Roberts, 2004). Where colonial rule relies primarily on brute force rather than moral legitimacy, non-violent resistance may lack the leverage necessary to achieve full liberation.

Even within Gandhi's own framework, this limitation is implicitly acknowledged. His emphasis on self-discipline, moral conversion, and gradual transformation implies an awareness that non-violence is not universally effective but a tactic that requires specific sociopolitical conditions. As Panda notes, Gandhi's defence of non-violence presupposes a moral environment that may not hold in contexts marked by extreme violence and systematic dehumanisation (Panda, 2020).

## Analysis of the Ethical-Pragmatic Tension

The tension between the ethical and pragmatic features of Gandhi's argument should not be understood as a fatal flaw, but rather as elucidating the conditional nature of his political theory. Gandhi does not claim that non-violence will always succeed, but that it represents the only means compatible with freedom understood as self-rule and moral autonomy. Where non-violence fails pragmatically, the failure reflects not the weakness of the theory's principle but the depth of moral and political corruption in such situations.

A more defensible interpretation of Gandhi's claim is therefore a qualified one: non-violence is ethically necessary for freedom, but only pragmatically sufficient under certain institutional conditions.

## Conclusion

Gandhi's argument that non-violence is both ethical and pragmatic is justified, but only within limits. Ethically, non-violence is central to the conception of freedom as self-rule, and it coheres with Gandhi's critique of modern civilisation and domination. Pragmatically, non-violence can be an effective strategy of resistance, particularly against forms of imperial rule that depend on public accountability. However, its effectiveness is contingent on these factors rather than universal.

Recognising these limits does not weaken Gandhi's theory — rather, it clarifies its range of effectiveness and preserves its ethical power while avoiding overstated claims about universal political applicability. In this qualified sense, Gandhi's defence of non-violence remains a powerful, if not exhaustive, account of how freedom may be pursued under conditions of domination.

## Bibliography

Gandhi, M. (2009). *Hind Swaraj and Other Writings*. 2nd edn. Cambridge: Cambridge University Press.

Nandy, A. (1981). "From Outside the Imperium: Gandhi's Cultural Critique of the West." *Alternatives* 7(2): 189–211.

Mantena, K. (2012). "Another Realism: The Politics of Gandhian Nonviolence." *American Political Science Review*.

Roberts, N. (2004). "Fanon, Sartre, Violence, and Freedom." Albany: SUNY Press.

Panda, R. (2020). "Gandhi's Hind Swaraj: A Philosophical Appraisal." *Journal of Indian Council of Philosophical Research*.
`,

  'allison-cuban-missile-crisis': `
## Introduction

The Cuban Missile Crisis (CMC) was one of the most dangerous moments of the Cold War, bringing the US and USSR to the brink of nuclear warfare. Understanding how it was managed is therefore invaluable to foreign policy decision-making. The most influential framework for evaluating this is Graham Allison's three-model theory, presented in *Essence of Decision* (Allison and Zelikow, 1999).

Conventional thinking suggested that states act as unified rational actors: Allison challenged this by proposing three alternative ways in which foreign policy decisions are made — the rational actor model; the organisational process model; and the bureaucratic politics model. I will argue that whilst the rational actor model successfully describes the strategic logic underlying the behaviour of states, it fails to capture the specific dynamics of decision-making. The organisational process model offers better insights into bureaucratic constraints but does not explain the final policy outcome. The bureaucratic politics model provides the best explanation of the CMC because it reveals how competing political actors within the US government shaped the overall decision.

## Allison's Models of Foreign Policy Decision-Making

The rational actor model (RAM) demonstrates the classical view of international decision-making, wherein governments are treated as individual actors that identify objectives, evaluate alternatives, and choose the option that maximises strategic advantage (Allison and Zelikow, 1999). The outcomes of foreign policy are thus interpreted as fully rational responses to external threats.

The organisational process model (OPM) argues that government behaviour is formed by bureaucratic organisations operating through established routines. Policymakers rely on standard operating procedures and existing capabilities when responding to crises, which results in outcomes that reflect both strategic calculations and institutional constraints (Hudson, 2024).

The bureaucratic politics model (BPM) provides a more political interpretation. It argues that foreign policy outcomes emerge from bargaining amongst individuals occupying different positions within a government. As Allison observed: "where you stand depends on where you sit" (Allison and Zelikow, 1999). Decisions result from political negotiation rather than purely rational analysis.

## The Rational Actor Model

From this lens, the US's response to the CMC should be understood as a calculated attempt to remove a direct threat whilst avoiding nuclear escalation. The Kennedy administration ultimately chose a naval blockade rather than an immediate invasion or air strike, suggesting a calculated attempt to balance the removal of Soviet missiles with the need to avoid rapid escalation (Allison, 2024).

However, whilst the RAM captures the strategic logic behind the overall policy outcome, it assumes a level of unification and synergy within government decision-making that I do not believe fully existed. The intense disagreements within the administration suggest that state behaviour cannot be taken as solely the product of a single coherent actor.

## The Organisational Process Model

The OPM helps explain why military leaders initially favoured an air strike against Soviet missile sites in Cuba. Such a proposal reflects pre-existing military plans and capabilities — the kind of response that emerges naturally from standard operating procedures (Hudson, 2024). However, whilst the OPM highlights how organisational routines shape the options available to decision-makers, it does not fully explain the final outcome. Kennedy ultimately rejected the military's preferred option, suggesting that SOPs alone cannot account for the policy adopted.

## The Bureaucratic Politics Model

The BPM takes foreign policy decisions as the result of bargaining amongst different positions within government. Certain debates within the Executive Committee resulted in significant disagreements between military leaders, who advocated for immediate military action, and civilian advisers who counselled greater caution (Lebow and Pelopidas, 2023). We can therefore interpret the decision to use a blockade as the outcome of political negotiation amongst competing actors — neither pure strategic calculation nor bureaucratic standard procedure, but a synthesis of both.

## Comparing the Models

Each model captures an important factor. The RAM provides a useful starting point — Kennedy's decision to impose a naval blockade can be interpreted as a calculated method to remove the Soviet missiles whilst managing escalation. Similarly, Khrushchev's eventual agreement to withdraw suggests a rational recognition of the dangers of nuclear conflict. However the RAM oversimplifies by assuming governments act as coherent actors. In reality, the US administration was significantly divided, and deliberation was required to generate a response.

The OPM is more nuanced as it highlights the role of institutional procedures — military proposals show the established planning infrastructure. Nevertheless, it cannot singlehandedly account for the final decision since Kennedy ultimately rejected the military's preference.

The BPM offers the most convincing explanation because it acknowledges the political bargaining within government. The debates in ExComm show that policy emerged from negotiation amongst actors with competing priorities. The naval blockade can therefore be understood as a compromise between military demands and civilian concerns.

## Conclusion

Allison's three models demonstrate that foreign policy decisions cannot be understood through a single framework. Whilst rational strategy and organisational routines both influenced the management of the CMC, these perspectives alone cannot account for how the overall policy was created. The crisis shows that decision-making in governments — formed by debate, disagreement, and compromise amongst actors with differing priorities — is the most accurate description of how policy emerges.

In this context, the BPM provides the most persuasive explanation because it recognises that foreign policy occurs from political interaction rather than political calculation. The CMC therefore illustrates the importance of examining a government's internal dynamics when attempting to understand how states respond to major international events.

## Bibliography

Allison, G. and Zelikow, P. (1999). *Essence of Decision: Explaining the Cuban Missile Crisis*. 2nd edn. New York: Longman.

Hudson, V. (2024). *Foreign Policy Analysis: Classic and Contemporary Theory*. Lanham: Rowman & Littlefield.

Allison, G. (2024). "The Cuban Missile Crisis." In *Foreign Policy: Theories, Actors, Cases*. Oxford: Oxford University Press.

Lebow, R.N. and Pelopidas, B. (2023). "Facing Nuclear War: Luck, Learning and the Cuban Missile Crisis." In *The Oxford Handbook of History and International Relations*. Oxford: Oxford University Press.
`,
}

export default async function EssayPage({ params }: Props) {
  const { slug } = await params
  const essay = essays.find((e) => e.slug === slug)

  if (!essay) notFound()

  const content = essayContent[slug] ?? essay.summary

  // Simple markdown-like rendering
  const sections = content.trim().split('\n\n').filter(Boolean)

  // Render inline formatting: *italic* and **bold**
  function renderInline(text: string) {
    const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/)
    return parts.map((part, j) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={j} className="font-medium text-stone-700">{part.slice(2, -2)}</strong>
      }
      if (part.startsWith('*') && part.endsWith('*')) {
        return <em key={j}>{part.slice(1, -1)}</em>
      }
      return part
    })
  }

  return (
    <div className="max-w-6xl mx-auto px-6">
      <div className="pt-12 pb-6">
        <Link
          href="/writing"
          className="inline-flex items-center gap-2 text-sm text-stone-400 hover:text-stone-700 transition-colors"
        >
          <ArrowLeft size={14} /> Writing
        </Link>
      </div>

      <div className="max-w-2xl">
        <div className="flex flex-wrap gap-2 mb-6">
          {essay.tags.map((t) => <Tag key={t} variant="muted">{t}</Tag>)}
        </div>
        <h1 className="text-2xl md:text-3xl font-light text-stone-800 tracking-tight leading-snug mb-4">
          {essay.title}
        </h1>
        <div className="flex items-center gap-4 text-xs text-stone-400 mb-12 pb-8 border-b border-stone-200">
          <span>{essay.date}</span>
          <span>{essay.readingTime}</span>
        </div>

        <div className="prose-like space-y-5 font-serif">
          {sections.map((block, i) => {
            if (block.startsWith('## ')) {
              return (
                <h2 key={i} className="text-base font-semibold font-sans text-stone-800 mt-10 mb-2 tracking-tight">
                  {block.replace('## ', '')}
                </h2>
              )
            }
            if (block.startsWith('**') && block.endsWith('**')) {
              return (
                <p key={i} className="font-medium text-stone-700 leading-relaxed">
                  {block.replace(/\*\*/g, '')}
                </p>
              )
            }
            return (
              <p key={i} className="text-stone-700 leading-[1.85] text-[1rem]">
                {renderInline(block)}
              </p>
            )
          })}
        </div>

        <div className="mt-16 pt-8 border-t border-stone-200">
          <Link
            href="/writing"
            className="inline-flex items-center gap-2 text-sm text-stone-400 hover:text-stone-700 transition-colors"
          >
            <ArrowLeft size={14} /> Back to writing
          </Link>
        </div>
      </div>
    </div>
  )
}

