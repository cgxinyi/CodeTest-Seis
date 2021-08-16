import * as cdk from '@aws-cdk/core';
import { Stack, StackProps, Construct, SecretValue } from '@aws-cdk/core';
import * as ec2 from '@aws-cdk/aws-ec2';
import * as ecs from '@aws-cdk/aws-ecs';
import * as ecs_patterns from '@aws-cdk/aws-ecs-patterns';
import { CdkPipeline, SimpleSynthAction } from '@aws-cdk/pipelines';
import * as codepipeline from '@aws-cdk/aws-codepipeline';
import * as codepipeline_actions from '@aws-cdk/aws-codepipeline-actions';
import { WorkshopPipelineStage } from './pipeline';

export class SpringbootfagateStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);


    // The code that defines your stack goes here
    const vpc = new ec2.Vpc(this,"MyVpc",{
      maxAzs:2
    });
    
    const cluster = new ecs.Cluster(this,"MyCluster",{
      vpc: vpc
    });

    const Service = new ecs_patterns.ApplicationLoadBalancedFargateService(this, "Service", {
        cluster: cluster,
        memoryLimitMiB: 1024,
        cpu: 512,
        desiredCount: 2,
        taskImageOptions: {
          image: ecs.ContainerImage.fromAsset("../springbootcdk/springbooteclipse/"),
          containerPort: 8080
        },
        
      });
      
      Service.targetGroup.configureHealthCheck({ path: "/actuator/health"});


      const sourceArtifact = new codepipeline.Artifact();
      const cloudAssemblyArtifact = new codepipeline.Artifact();

      const pipeline = new CdkPipeline(this, 'SeisPipeline', {
        pipelineName: 'SeisPipeline',
        cloudAssemblyArtifact,
        sourceAction: new codepipeline_actions.GitHubSourceAction({
          actionName: 'GitHub',
          output: sourceArtifact,
          oauthToken: cdk.SecretValue.plainText('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'),
          trigger: codepipeline_actions.GitHubTrigger.POLL,
          // Replace these with your actual GitHub project info
          owner: 'cgxinyi',
          repo: 'CodeTest-Seis',
          branch: 'main',
        }), synthAction: SimpleSynthAction.standardNpmSynth({
          sourceArtifact,
          cloudAssemblyArtifact,
          environment: {
            privileged: true,
          },
          buildCommand: 'cd ../springbootcdk && npm install & npm run build',
          
        }),
      });
  
      const deploy = new WorkshopPipelineStage(this, 'Deploy');
      pipeline.addApplicationStage(deploy);
      
      new cdk.CfnOutput(this, "loadBalancerUrl", {
        value: Service.loadBalancer.loadBalancerDnsName,
        exportName: "loadBalancerUrl",
      });
  }

  
}

