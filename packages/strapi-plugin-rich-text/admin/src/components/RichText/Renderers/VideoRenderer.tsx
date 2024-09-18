import { Editor, NodeViewWrapper } from "@tiptap/react";

type VideoProps = {
  editor: Editor;
} & Record<string, any>;

const VideoRenderer = (props: VideoProps) => {
  const { node } = props;

  return (
    <NodeViewWrapper>
      <div className="video-wrapper">
        <video
          controls={node.attrs.controls}
          src={node.attrs.src}
          width={node.attrs.width}
          height={node.attrs.height}
          data-video-resolution={`${node.attrs.width}x${node.attrs.height}`}
          data-document-id={node.attrs.documentId}
        >
          <source src={node.attrs.src} />
        </video>
      </div>
    </NodeViewWrapper>
  );
};

export default VideoRenderer;
