/* Curated presentation of the recorded workflows in workflows.html. No live inference. */
window.VIDEOGEN_DEMO = [
  {
    "id": "PK",
    "name": "Procedural Knowledge",
    "prompt": "An elderly Tai Chi practitioner in a white tunic performs \"White Crane Spreads Its Wings\" in a quiet courtyard.",
    "color": "#82dec0",
    "critique": "Without knowledge lookup, the named posture is left to the generator’s prior.",
    "baseline": [
      "videos/seedance_baselines/kp_1.mp4",
      null
    ],
    "steps": [
      {
        "title": "Find the exact posture",
        "description": "Search the named Tai Chi form before generating.",
        "tool": "search",
        "reasoning": "This is a specific named Tai Chi posture — '白鹤亮翅 / White Crane Spreads Its Wings'. To render it faithfully I need the exact hand positions, stance, and weight distribution. I'll search for the standard form description first.",
        "args": "{\"query\": \"White Crane Spreads Its Wings tai chi posture form\"}",
        "result": "<information>Search results for 'White Crane Spreads Its Wings tai chi posture form':\n\n=== White Crane Spreads Its Wings (白鹤亮翅) ===\n**Yang-style Tai Chi 24-Form, Posture #4**\n- 'The right arm rises in a sweeping arc until the hand is at forehead height, palm facing inward; the left hand simultaneously settles beside the left thigh, palm angled outward. The posture evokes a crane spreading one wing while folding the other.'\n- 'Stance: empty stance (虚步) on the LEFT foot — the left toe lightly touches the ground while all body weight rests on the bent RIGHT rear leg. The waist is held square, spi …",
        "images": [],
        "video": null
      },
      {
        "title": "Ground the movement",
        "description": "Use the retrieved hand positions, stance and weight distribution.",
        "tool": "video_gen_text",
        "reasoning": "Now I have the key details: right hand raised palm-inward at forehead height, left hand beside left thigh palm angled out, empty stance on the left foot, weight on bent right rear leg, spine vertical, arms forming a diagonal split. I'll fold these specifics into a video prompt with a quiet courtyard setting and slow morning motion.",
        "args": "{\"prompt\": \"An elderly man in a white tunic holds 'White Crane Spreads Its Wings' in a sunlit stone courtyard. His right hand is raised palm-inward at forehead height with elbow softly bent; his left hand rests beside his left thigh, palm angled outward and fingers gently curved. His left toe barely grazes the ground in an empty stance as nearly al …",
        "result": "",
        "images": [],
        "video": "test_videos_v2/seedance2_agent_kp1.mp4"
      },
      {
        "title": "Final result",
        "description": "The completed video from the recorded agent workflow.",
        "tool": "Final video",
        "reasoning": "The generated video shows the practitioner in the courtyard performing the posture with the correct hand positions and stance.",
        "args": "",
        "result": "",
        "images": [],
        "video": "test_videos_v2/seedance2_agent_kp1.mp4"
      }
    ]
  },
  {
    "id": "SI",
    "name": "Single-Entity Identity",
    "prompt": "Vigil (from the game Arknights) draws his crossbow in a fluid motion, cloak billowing as he fires a bolt trailing dark energy, his single visible eye narrowing while architecture crumbles behind him.",
    "color": "#c6acff",
    "critique": "Without a visual reference, the named character’s identity is not explicitly grounded.",
    "baseline": [
      "videos/seedance_baselines/vks_3472.mp4",
      null
    ],
    "steps": [
      {
        "title": "Find Vigil",
        "description": "Retrieve visual references of the Arknights character.",
        "tool": "image_search",
        "reasoning": "The user wants a video of Vigil from Arknights. This involves a specific named character whose appearance matters, so I should use image_search to find reference images, then video_gen_single_reference. I'll start by searching for reference images of Vigil from Arknights to capture his distinctive appearance accurately.",
        "args": "{\"query\": \"Vigil Arknights operator character art\", \"top_k\": 5}",
        "result": "",
        "images": [
          "lf_cached_images/2829-3d2bfc549bd9aa5869261cf162ba4fe1.jpg",
          "lf_cached_images/2829-4d28f9f91c09ea2245d4a14fb11cd616.jpg",
          "lf_cached_images/2829-57161afa6266ee17c99404e79669235f.jpg",
          "lf_cached_images/2829-578e2902111ba6e9522c76e9b7c01d9f.jpg",
          "lf_cached_images/2829-5ae618b7a5e9a55056b91e8f7d0eba00.jpg"
        ],
        "video": null
      },
      {
        "title": "Preserve the identity",
        "description": "Condition generation on the selected character reference.",
        "tool": "video_gen_single_reference",
        "reasoning": "Looking through the returned images, IMG_001 is the clearest shot — Vigil's dark cloak, his single visible eye, and his crossbow are all plainly visible. I'll use this one as the appearance reference.",
        "args": "{\"prompt\": \"Vigil from Arknights, a dark cloaked operative with a single visible glowing eye, draws his ornate crossbow in a fluid, deadly motion. His dark cloak billows dramatically in the wind. He releases a glowing bolt trailing swirling dark energy and shadow particles. His single visible eye narrows with cold precision. Behind him, ancient sto …",
        "result": "",
        "images": [],
        "video": "test_videos_vks/v5_compare/agent_r2v/3472.mp4"
      },
      {
        "title": "Final result",
        "description": "The completed video from the recorded agent workflow.",
        "tool": "Final video",
        "reasoning": "The generated Vigil video captures the character's cloaked silhouette and crossbow draw, with the dark energy bolt and crumbling architecture. The Arknights art style comes through.",
        "args": "",
        "result": "",
        "images": [],
        "video": "test_videos_vks/v5_compare/agent_r2v/3472.mp4"
      }
    ]
  },
  {
    "id": "MI",
    "name": "Multi-Entity Identity",
    "prompt": "On a sunny Paris rooftop terrace at golden hour, a young actor performs in front of the camera as Mati Diop adjusts the cinema camera, Ladj Ly crouches beside the video-village monitor pointing at the playback, and Audrey Diwan leans over his shoulder pointing at the same screen to discuss the take.",
    "color": "#86c7ff",
    "critique": "Text alone provides no explicit visual reference for each of the three named directors.",
    "baseline": [
      "videos/seedance_baselines/vkm_10004.mp4",
      null
    ],
    "steps": [
      {
        "title": "Find Mati Diop",
        "description": "Retrieve the first director’s visual references.",
        "tool": "image_search",
        "reasoning": "The prompt involves specific named people (Mati Diop, Ladj Ly, Audrey Diwan) whose appearances matter. I should image_search for each of them to get reference images, then use video_gen_multiple_reference. I'll search for reference images of all three directors so their appearances are grounded before generating the video.",
        "args": "{\"query\": \"Mati Diop film director\", \"top_k\": 3}",
        "result": "",
        "images": [
          "lf_cached_images/611-0286fe375128d4f0b9732d772b753718.jpg",
          "lf_cached_images/611-1f8631062176effe05ef83dda9f5186c.jpg",
          "lf_cached_images/611-236dd23ef4d7413e30fbbdfacf42bdb0.jpg",
          "lf_cached_images/611-2dfa6a520462c28d00e4c0e9efbd5055.jpg",
          "lf_cached_images/611-4c0ae750e0d9ca99fb05a32d1a8b898d.jpg"
        ],
        "video": null
      },
      {
        "title": "Find Ladj Ly",
        "description": "Retrieve the second director’s visual references.",
        "tool": "image_search",
        "reasoning": "Good, I have Mati Diop's reference image. Now let me search for Ladj Ly. Good. Now searching for Ladj Ly.",
        "args": "{\"query\": \"Ladj Ly film director\", \"top_k\": 3}",
        "result": "",
        "images": [
          "lf_cached_images/4908-03f3e74d9cd9207023b60539f6b88b9a.jpg",
          "lf_cached_images/4908-2212aa48b0d0c40cfd7295e89b7f3da8.jpg",
          "lf_cached_images/4908-406ceba06b0b1fde56055c7cf13cad21.jpg",
          "lf_cached_images/4908-50b45c69c53292c5aca5963717998cfb.jpg",
          "lf_cached_images/4908-61c93c6ecde3bc572a922b6f70ed8b62.jpg"
        ],
        "video": null
      },
      {
        "title": "Find Audrey Diwan",
        "description": "Retrieve the third director’s visual references.",
        "tool": "image_search",
        "reasoning": "Now searching for Audrey Diwan. Now searching for Audrey Diwan.",
        "args": "{\"query\": \"Audrey Diwan film director\", \"top_k\": 3}",
        "result": "",
        "images": [
          "lf_cached_images/7480-1107f1863af17eaa7b5cba8aac566bed.jpg",
          "lf_cached_images/7480-1f8631062176effe05ef83dda9f5186c.jpg",
          "lf_cached_images/7480-2ab5279d6470c784cec33d81f5f0fa3a.jpg",
          "lf_cached_images/7480-3c905db5fcf90b6240b1df0bb0991255.jpg",
          "lf_cached_images/7480-42d033ebe175606b01f03a6492c92d0a.jpg"
        ],
        "video": null
      },
      {
        "title": "Compose the cast",
        "description": "Bind the three references to their roles in the rooftop scene.",
        "tool": "video_gen_multiple_reference",
        "reasoning": "All three reference images are ready. Now I'll generate the video using all of them with a rich, detailed prompt capturing the Paris rooftop scene. All three directors' reference images are ready. Now generating the video with all of them together on the Paris rooftop.",
        "args": "{\"prompt\": \"On a sunny Paris rooftop terrace, three acclaimed French women directors collaborate closely on a film set. In the foreground, Mati Diop — a Black French-Senegalese director with natural hair — holds a handheld camera, framing a shot with focused intensity, the golden afternoon sun casting warm light across the Parisian rooftops and the …",
        "result": "",
        "images": [],
        "video": "videos/agent_seedance2/vkm_10004.mp4"
      },
      {
        "title": "Final result",
        "description": "The completed video from the recorded agent workflow.",
        "tool": "Final video",
        "reasoning": "I think the generated video aligns with the prompt as expected.",
        "args": "",
        "result": "",
        "images": [],
        "video": "test_videos_vkm/seedance2_agent_10004.mp4"
      }
    ]
  },
  {
    "id": "PS",
    "name": "Physics Simulation",
    "prompt": "A 0.3 kg rubber ball at 8 m/s hits the edge of a 3 kg metal cube and the cube starts rotating. Please maintain physics realism.",
    "color": "#f6bc80",
    "critique": "A single text-to-video call does not explicitly simulate the specified collision dynamics.",
    "baseline": [
      "videos/seedance_baselines/ps_10002.mp4",
      null
    ],
    "steps": [
      {
        "title": "Simulate the collision",
        "description": "Set mass, velocity and off-center contact in a physical simulation.",
        "tool": "simulation",
        "reasoning": "The prompt describes an off-center impact: a light rubber ball strikes the upper edge of a much heavier metal cube. Because the contact point is offset from the cube's centroid, the impulse generates angular momentum → the cube should rotate. Pure head-on collision would NOT produce rotation, so I must set the sphere's y above the cube's center to force an edge contact.\n\nSetting up collision mode  …",
        "args": "{\"mode\": \"collision\", \"a\": {\"shape\": \"sphere\", \"x\": -4.0, \"y\": 0.5, \"vx\": 8.0, \"vy\": 0.0, \"mass\": 0.3, \"omega\": 0.0, \"size\": 1.0}, \"b\": {\"shape\": \"rect\", \"x\": 2.0, \"y\": 0.0, \"vx\": 0.0, \"vy\": 0.0, \"mass\": 3.0, \"omega\": 0.0, \"size\": 1.6}, \"restitution\": 0.85}",
        "result": "",
        "images": [],
        "video": "test_videos_ps_sim/p785_3d.mp4"
      },
      {
        "title": "Render the motion",
        "description": "Use VACE to turn simulated motion into a photorealistic scene.",
        "tool": "video_gen_vace",
        "reasoning": "The simulation produced the correct dynamics — the ball hits the cube's edge off-center and the cube picks up rotation. Now I'll feed the optical-flow video to VACE so it can synthesize a photorealistic version while following the same motion. The prompt should describe the visual materials (red rubber ball, polished metal cube, concrete floor) and the action.",
        "args": "{\"prompt\": \"A 0.3 kg red rubber ball flies in from the left at high speed and strikes the upper edge of a heavy 3 kg polished metal cube resting on a smooth concrete floor. The off-center impact transfers angular momentum to the cube, sending it spinning around its vertical axis while sliding slightly backward; the rubber ball deflects upward and t …",
        "result": "",
        "images": [],
        "video": "test_videos_ps_sim/p785_vace.mp4"
      },
      {
        "title": "Final result",
        "description": "The completed video from the recorded agent workflow.",
        "tool": "Final video",
        "reasoning": "The VACE output follows the sim's flow precisely — the ball glances off the cube's top edge and the cube rotates as expected. The visual style matches the prompt.",
        "args": "",
        "result": "",
        "images": [],
        "video": "test_videos_ps_sim/p785_vace.mp4"
      }
    ]
  },
  {
    "id": "CS",
    "name": "Compositional Scene",
    "prompt": "Glass cracking, a cricket ball breaks a pavilion window and the scorer inside shields his ledger.",
    "color": "#89b9ff",
    "critique": "The draft misses the cricket ball: Grounding DINO detects it in 0 of 6 sampled frames.",
    "baseline": [
      "test_videos_dino/cricket_direct.mp4",
      null
    ],
    "steps": [
      {
        "title": "Generate a draft",
        "description": "Create the cricket-ball, window, scorer and ledger scene.",
        "tool": "video_gen_text",
        "reasoning": "Several distinct common-noun subjects here: a cricket ball, a pavilion window, the scorer (a person), and his ledger (a book). I'll generate a first video, then verify each subject actually appears with grounding_dino_video before finalizing.",
        "args": "{\"prompt\": \"Glass cracking, a cricket ball breaks a pavilion window and the scorer inside shields his ledger. Cinematic, dramatic lighting.\"}",
        "result": "",
        "images": [],
        "video": "test_videos_dino/cricket_direct.mp4"
      },
      {
        "title": "Detect missing subjects",
        "description": "Grounding DINO does not detect the cricket ball in the draft.",
        "tool": "grounding_dino_video",
        "reasoning": "Now verify all four subjects — cricket ball, window, scorer, ledger — are actually in the draft.",
        "args": "{\"video\": \"cricket_direct.mp4\", \"query\": \"cricket ball . window . person . book\", \"n\": 6}",
        "result": "Video detection for 'cricket ball . window . person . book.':\n  Sampled n=6 frames total (detection_ratio=1.00)\n  Per-object breakdown:\n    [cricket ball]: NOT DETECTED in any frame\n    [window]:       found in 6/6 frames, best_conf=0.4573\n    [person]:       found in 6/6 frames, best_conf=0.8137\n    [book]:         found in 6/6 frames, best_conf=0.7033",
        "images": [],
        "video": null
      },
      {
        "title": "Recover the ball",
        "description": "Regenerate with an explicit, visible red ball entering from outside.",
        "tool": "video_gen_text",
        "reasoning": "Grounding DINO flags the cricket ball as absent — the generator dropped the small, fast object. I'll regenerate: make a red leather cricket ball fly IN from outside and smash through the window, keeping it clearly visible in frame.",
        "args": "{\"prompt\": \"Interior view of a cricket pavilion scoring room. From OUTSIDE, a red leather cricket ball flies in toward the camera and smashes THROUGH the glass window; glass shatters inward. The scorer recoils and raises his open ledger to shield himself. The cricket ball stays visible.\"}",
        "result": "",
        "images": [],
        "video": "test_videos_dino/cricket_refined.mp4"
      },
      {
        "title": "Verify again",
        "description": "The revised query “ball” detects it in 2 of 6 frames; all four subjects are found.",
        "tool": "grounding_dino_video",
        "reasoning": "Re-verify. Grounding DINO matches simple nouns better than the compound 'cricket ball', so I query 'ball'.",
        "args": "{\"video\": \"cricket_refined.mp4\", \"query\": \"ball . window . person . book\", \"n\": 6}",
        "result": "Video detection for 'ball . window . person . book.':\n  Sampled n=6 frames total (detection_ratio=1.00)\n  Per-object breakdown:\n    [ball]:   found in 2/6 frames, best_conf=0.7383  <- recovered\n    [window]: found in 6/6 frames, best_conf=0.3808\n    [person]: found in 6/6 frames, best_conf=0.8726\n    [book]:   found in 6/6 frames, best_conf=0.6782",
        "images": [],
        "video": null
      },
      {
        "title": "Final result",
        "description": "The completed video from the recorded agent workflow.",
        "tool": "Final video",
        "reasoning": "All four subjects now present — the cricket ball was recovered after the Grounding-DINO-guided regeneration.",
        "args": "",
        "result": "",
        "images": [],
        "video": "test_videos_dino/cricket_refined.mp4"
      }
    ]
  },
  {
    "id": "MS",
    "name": "Multi-Shot",
    "prompt": "In a 12-second video, 0-4s: a heavy rain gutter clogged with leaves and overflowing. 4-8s: the weight cracks the bracket. 8-12s: the gutter section swings down and dumps water and leaves on the walkway.",
    "color": "#a6a2ff",
    "critique": "A single generation has no explicit shot-by-shot control over overflow → fracture → collapse.",
    "baseline": [
      "videos/seedance_baselines/tg_5125.mp4",
      "videos/agent_trajectory/ms5125_baseline_sd2.mp4"
    ],
    "steps": [
      {
        "title": "Shot 01 · Overflow",
        "description": "Generate the first four seconds: leaves clog the rain gutter.",
        "tool": "video_gen_text",
        "reasoning": "This is a 3-phase scene. I'll split it into three 4-second sub-clips, rewrite each into a fully visual prompt, then generate phase 1 (the clogged, overflowing gutter) first.",
        "args": "{\"prompt\": \"A weathered aluminum rain gutter packed tightly with soggy, decomposing leaves hangs beneath a roofline during a heavy downpour, water cascading over its brim in thick sheets, pooling and spilling relentlessly as dark storm light casts deep shadows across the saturated debris.\", \"duration\": 4}",
        "result": "",
        "images": [],
        "video": "test_videos_tg/seedance2_agent_5125_clip1.mp4"
      },
      {
        "title": "Carry the scene forward",
        "description": "Extract the last frame to preserve the gutter, roofline and lighting.",
        "tool": "extract_last_frame",
        "reasoning": "Phase 1 looks right — the clogged overflowing gutter under the downpour. To keep the same gutter / roofline / lighting going into phase 2 (bracket cracks), I'll grab the last frame as the i2v seed.",
        "args": "{\"video_path\": \"/scratch/gpfs/MENGDIW/sl8264/binxu/Benchmark/test_videos_tg/seedance2_agent_5125_clip1.mp4\"}",
        "result": "",
        "images": [
          "test_videos_tg/seedance2_agent_5125_clip1_lastframe.jpg"
        ],
        "video": null
      },
      {
        "title": "Shot 02 · Fracture",
        "description": "Use that frame to generate the bracket cracking under the weight.",
        "tool": "video_gen_image",
        "reasoning": "Use the last frame of phase 1 as the i2v seed for phase 2 — the bracket cracking under the weight of waterlogged leaves.",
        "args": "{\"prompt\": \"The immense weight of the waterlogged leaves and pooling water strains the rusted metal bracket securing the gutter, forcing it to buckle and crack with a sharp fracture, the bracket splitting apart under the pressure as the gutter lurches and tilts beneath the dark, rain-drenched roofline.\", \"image\": \"/scratch/gpfs/MENGDIW/sl8264/binxu …",
        "result": "",
        "images": [],
        "video": "test_videos_tg/seedance2_agent_5125_clip2.mp4"
      },
      {
        "title": "Preserve continuity",
        "description": "Extract the second shot’s last frame for the final transition.",
        "tool": "extract_last_frame",
        "reasoning": "Same approach for phase 3 — last frame of phase 2 seeds the gutter swinging down and the cascade onto the walkway.",
        "args": "{\"video_path\": \"/scratch/gpfs/MENGDIW/sl8264/binxu/Benchmark/test_videos_tg/seedance2_agent_5125_clip2.mp4\"}",
        "result": "",
        "images": [
          "test_videos_tg/seedance2_agent_5125_clip2_lastframe.jpg"
        ],
        "video": null
      },
      {
        "title": "Shot 03 · Collapse",
        "description": "Generate the gutter swinging down and spilling onto the walkway.",
        "tool": "video_gen_image",
        "reasoning": "Generate phase 3: the gutter section swings down and the water + leaves crash onto the walkway, seeded from the fractured-bracket frame.",
        "args": "{\"prompt\": \"The fractured gutter section swings violently downward, releasing a torrent of murky water and sodden, decomposing leaves that crashes onto the concrete walkway below, spreading in a dark, debris-filled flood across the rain-slicked surface under the stormy grey light.\", \"image\": \"/scratch/gpfs/MENGDIW/sl8264/binxu/Benchmark/test_videos …",
        "result": "",
        "images": [],
        "video": "test_videos_tg/seedance2_agent_5125_clip3.mp4"
      },
      {
        "title": "Final result",
        "description": "The completed video from the recorded agent workflow.",
        "tool": "Final video",
        "reasoning": "All three 4-second clips are generated. Concatenated they form the 12-second multi-phase result.",
        "args": "",
        "result": "",
        "images": [],
        "video": "test_videos_tg/seedance2_agent_5125.mp4"
      }
    ]
  }
];

window.VIDEOGEN_POSTERS = {
  "test_videos_dino/cricket_direct.mp4": "images/demo-posters/5d42d3a7d88f.jpg",
  "test_videos_dino/cricket_refined.mp4": "images/demo-posters/390d65616b72.jpg",
  "test_videos_ps_sim/p785_3d.mp4": "images/demo-posters/eb74ba026645.jpg",
  "test_videos_ps_sim/p785_vace.mp4": "images/demo-posters/debd1214174e.jpg",
  "test_videos_tg/seedance2_agent_5125.mp4": "images/demo-posters/dbe0aa29c6ad.jpg",
  "test_videos_tg/seedance2_agent_5125_clip1.mp4": "images/demo-posters/d08dc6787807.jpg",
  "test_videos_tg/seedance2_agent_5125_clip2.mp4": "images/demo-posters/b3d722c57a1f.jpg",
  "test_videos_tg/seedance2_agent_5125_clip3.mp4": "images/demo-posters/db3698ae51c9.jpg",
  "test_videos_v2/seedance2_agent_kp1.mp4": "images/demo-posters/0166701840ee.jpg",
  "test_videos_vkm/seedance2_agent_10004.mp4": "images/demo-posters/9002c3785599.jpg",
  "test_videos_vks/v5_compare/agent_r2v/3472.mp4": "images/demo-posters/71281db5005b.jpg",
  "videos/agent_seedance2/vkm_10004.mp4": "images/demo-posters/5c955011d1b7.jpg",
  "videos/agent_trajectory/ms5125_baseline_sd2.mp4": "images/demo-posters/faf659202338.jpg",
  "videos/seedance_baselines/kp_1.mp4": "images/demo-posters/f2cb1fde5fba.jpg",
  "videos/seedance_baselines/ps_10002.mp4": "images/demo-posters/d802ab6188c8.jpg",
  "videos/seedance_baselines/tg_5125.mp4": "images/demo-posters/b604aa2a630c.jpg",
  "videos/seedance_baselines/vkm_10004.mp4": "images/demo-posters/3defdfadcbf0.jpg",
  "videos/seedance_baselines/vks_3472.mp4": "images/demo-posters/1e019c53a627.jpg"
};
